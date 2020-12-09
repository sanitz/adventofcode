/*
--- Day 8: Handheld Halting ---
https://adventofcode.com/2020/day/8 
*/

const input = require("fs").readFileSync(`${__dirname}/input.txt`, "utf-8");

const example_input = require("fs").readFileSync(
  `${__dirname}/example_input.txt`,
  "utf-8"
);

const parse_program = (lines) =>
  lines.split("\n").map((line) => ({
    instruction: line.slice(0, 3),
    argument: Number.parseInt(line.slice(4)),
  }));

const parse_input = () => parse_program(input);
const parse_example = () => parse_program(example_input);

test("Part 1 parse examples", () => {
  const instructions = parse_example();
  expect(instructions.length).toEqual(9);
  expect(instructions[8]).toEqual({ instruction: "acc", argument: 6 });
});

const run_once = (programm) => {
  let state = { seen: [], pos: 0, acc: 0 };

  main_loop: {
    while (true) {
      if (state.pos >= programm.length || state.seen.includes(state.pos)) {
        break main_loop;
      }
      state.seen.push(state.pos);
      const op = programm[state.pos];

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

test("Part 1 result", () => {
  expect(run_once(parse_input()).acc).toEqual(1671);
});

/*
--- Part Two ---
*/

const possible_error_positions = (instructions) =>
  instructions
    .map((i, idx) =>
      i.instruction === "jmp" || i.instruction === "nop" ? idx : undefined
    )
    .filter((x) => x !== undefined);

test("Part 2 - filter possible toggle positions ", () => {
  expect(possible_error_positions(parse_example())).toEqual([0, 2, 4, 7]);
});

const toggle = (i) => ({
  instruction: i.instruction === "jmp" ? "nop" : "jmp",
  argument: i.argument,
});

const toggle_at = (instructions, pos) =>
  instructions.map((instruction, idx) =>
    idx !== pos ? instruction : toggle(instruction)
  );

const fix = (instructions) => {
  const positions = possible_error_positions(instructions);
  return positions.reduce((found, position) => {
    if (!found) {
      const state = run_once(toggle_at(instructions, position));
      if (state.pos === instructions.length) {
        found = state.acc;
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
