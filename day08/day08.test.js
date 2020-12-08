/*
--- Day 8: Handheld Halting ---
https://adventofcode.com/2020/day/8 
*/

const parseLine = (str) => {
  return { instruction: str.slice(0, 3), argument: parseInt(str.slice(4)) };
};

const parse_program = (lines) =>
  lines.split("\n").map((line) => parseLine(line));

const example_input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

const parse_example = () => parse_program(example_input);

test("Part 1 parse examples", () => {
  const instructions = parse_example();
  expect(instructions.length).toEqual(9);
  expect(instructions[8]).toEqual({ instruction: "acc", argument: 6 });
});

const run_once = (programm) => {
  let state = { seen: [], pos: 0, acc: 0, hist: [] };

  main_loop: {
    while (true) {
      if (state.pos >= programm.length || state.seen.includes(state.pos)) {
        break main_loop;
      }
      state.seen.push(state.pos);
      const op = programm[state.pos];
      state.hist.push(op);

      if (op.instruction === "acc") {
        state.acc = state.acc + op.argument;
        state.pos = state.pos + 1;
      } else if (op.instruction === "jmp") {
        state.pos = state.pos + op.argument;
      } else if (op.instruction === "nop") {
        state.pos = state.pos + 1;
      }
    }
  }
  return state;
};

test("Part 1 example result", () => {
  expect(run_once(parse_example()).acc).toEqual(5);
});

const parse_input = () =>
  parse_program(require("fs").readFileSync(__dirname + "/input.txt", "utf-8"));

test("Part 1 result", () => {
  expect(run_once(parse_input()).acc).toEqual(1671);
});

/*
--- Part Two ---
*/

const example_input_correct = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
nop -4
acc +6`;

const jmp_nop_pos = (instructions) =>
  instructions
    .map((i, idx) =>
      i.instruction === "jmp" || i.instruction === "nop" ? idx : undefined
    )
    .filter((x) => x !== undefined);

test("Part 2 - filter possible toggle positions ", () => {
  expect(jmp_nop_pos(parse_example())).toEqual([0, 2, 4, 7]);
});

const toggle = (i) => ({
  instruction: i.instruction === "jmp" ? "nop" : "jmp",
  argument: i.argument,
});

test("Part 2 -  toggle instruction", () => {
  expect(toggle({ instruction: "nop", argument: 42 })).toEqual({
    instruction: "jmp",
    argument: 42,
  });
  let i = { instruction: "jmp", argument: 42 };
  expect(toggle(i)).toEqual({
    instruction: "nop",
    argument: 42,
  });
});

const toggle_at = (instructions, pos) =>
  instructions.map((instruction, idx) =>
    idx !== pos ? instruction : toggle(instruction)
  );

test("Part 2 -  toggle positions ", () => {
  const instructions = parse_example();
  expect(instructions[2].instruction).toEqual("jmp");
  const new_instructions = toggle_at(instructions, 2);
  expect(instructions[2].instruction).toEqual("jmp");
  expect(new_instructions[2].instruction).toEqual("nop");
});

const fix = (instructions) => {
  const positions = jmp_nop_pos(instructions);
  return positions.reduce((found, position) => {
    if (!found) {
      const hist = run_once(toggle_at(instructions, position));
      if (hist.pos === instructions.length) {
        found = hist.acc;
      }
    }
    return found;
  }, 0);
};

test("Part 2 -  fix example", () => {
  expect(fix(parse_example())).toEqual(8);
});

test("Part 2 -  result", () => {
  expect(fix(parse_input())).toEqual(892);
});
