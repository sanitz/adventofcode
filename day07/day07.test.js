/*
--- Day 7: Handy Haversacks ---
https://adventofcode.com/2020/day/7  
*/

const input = require("fs").readFileSync(`${__dirname}/input.txt`, "utf-8");

const example_input = require("fs").readFileSync(
  `${__dirname}/example_input.txt`,
  "utf-8"
);

const parseContent = (str) => {
  content = {};
  str.split(",").forEach((str) => {
    const m = str.match(/(\d+)\s+(.*) bag/);
    if (m) {
      const count = parseInt(m[1]);
      const color = m[2];
      content[color] = count;
    }
  });
  return content;
};

const parseRule = (line) => {
  const match = line.match(/(.+) bags contain (.+)/);
  if (match) {
    const color = match[1];
    const rules = parseContent(match[2]);
    return [color, rules];
  }
};

test("Part 1 - parsing rules", () => {
  let [color, rules] = parseRule(
    "light red bags contain 1 bright white bag, 2 muted yellow bags."
  );
  expect(color).toEqual("light red");
  expect(rules).toEqual({ "bright white": 1, "muted yellow": 2 });

  [color, rules] = parseRule("faded blue bags contain no other bags.");
  expect(color).toEqual("faded blue");
  expect(rules).toEqual({});
});

const parse_input = (input) =>
  input.split(/\n/).reduce((acc, line) => {
    const [color, rule] = parseRule(line);
    acc[color] = rule;
    return acc;
  }, {});

test("Part 1 - parsing example rules", () => {
  const example_rules = parse_input(example_input);
  expect(Object.keys(example_rules).length).toEqual(9);
  expect(example_rules["bright white"]).toEqual({ "shiny gold": 1 });
});

const validBags = (expected, rules) => {
  return Object.keys(rules).filter((color) =>
    canContain(color, expected, rules)
  );
};

const canContain = (color, expected, rules) => {
  return Object.keys(rules[color]).reduce((acc, ruleColor) => {
    return (
      acc || ruleColor === expected || canContain(ruleColor, expected, rules)
    );
  }, false);
};

test("Part 1 - count rules", () => {
  const example_rules = parse_input(example_input);
  expect(validBags("light red", example_rules)).toEqual([]);
  expect(validBags("shiny gold", example_rules).length).toEqual(4);
});

// const rulesDay07 = parseFile("/input.txt");

test("Part 1 - result", () => {
  const rules = parse_input(input);
  expect(validBags("shiny gold", rules).length).toEqual(169);
});

/*
--- Part Two ---
*/

const countBags = (expected, rules) =>
  Object.entries(rules[expected]).reduce(
    (acc, [color, count]) => count * (1 + countBags(color, rules)) + acc,
    0
  );

test("Part 2 - countBags", () => {
  const example_rules = parse_input(example_input);
  expect(countBags("faded blue", example_rules)).toEqual(0);
  expect(countBags("vibrant plum", example_rules)).toEqual(5 + 6);
  expect(countBags("shiny gold", example_rules)).toEqual(32);
});

test("Part 2 - result", () => {
  const rules = parse_input(input);
  expect(countBags("shiny gold", rules)).toEqual(82372);
});
