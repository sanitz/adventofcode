/*
--- Day 7: Handy Haversacks ---
https://adventofcode.com/2020/day/7  
*/

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

const parseFile = (fileName) =>
  require("fs")
    .readFileSync(__dirname + fileName, "utf-8")
    .split(/\n/)
    .reduce((acc, line) => {
      const [color, rule] = parseRule(line);
      acc[color] = rule;
      return acc;
    }, {});

const exampleRulesDay07 = parseFile("/input_examples.txt");

test("Part 1 - parsing example rules", () => {
  expect(Object.keys(exampleRulesDay07).length).toEqual(9);
  expect(exampleRulesDay07["bright white"]).toEqual({ "shiny gold": 1 });
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
  expect(validBags("light red", exampleRulesDay07)).toEqual([]);
  expect(validBags("shiny gold", exampleRulesDay07).length).toEqual(4);
});

const rulesDay07 = parseFile("/input.txt");

test("Part 1 - result", () => {
  expect(validBags("shiny gold", rulesDay07).length).toEqual(169);
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
  expect(countBags("faded blue", exampleRulesDay07)).toEqual(0);
  expect(countBags("vibrant plum", exampleRulesDay07)).toEqual(5 + 6);
  expect(countBags("shiny gold", exampleRulesDay07)).toEqual(32);
});

test("Part 2 - result", () => {
  expect(countBags("shiny gold", rulesDay07)).toEqual(82372);
});
