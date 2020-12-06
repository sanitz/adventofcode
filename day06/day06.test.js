/*
--- Day 6: Custom Customs ---
https://adventofcode.com/2020/day/6 
*/

const count = (lines) =>
  lines
    .split("")
    .filter((l) => l.match(/\w/))
    .filter((el, idx, arr) => arr.indexOf(el) == idx).length;

test("Part 1 given examples", () => {
  expect(count("abc")).toEqual(3);
  expect(count("a\nb\nc")).toEqual(3);
  expect(count("ab\nac")).toEqual(3);
  expect(count("a\na\na\na")).toEqual(1);
  expect(count("b")).toEqual(1);
});

const sumOfCount = (lines) =>
  lines.map((line) => count(line)).reduce((acc, count) => acc + count);

test("Part 1 sum of counts", () => {
  const lines = ["abc", "a\nb\nc", "ab\nac", "a\na\na\na", "b"];
  expect(sumOfCount(lines)).toEqual(3 + 3 + 3 + 1 + 1);
});

const entriesDay06 = require("fs")
  .readFileSync(__dirname + "/input.txt", "utf-8")
  .split(/\n\n+/);

test("Part 1 result", () => {
  expect(sumOfCount(entriesDay06)).toEqual(6259);
});

/*
  --- Part Two ---
*/

const countYes = (lines) => {
  const answers = lines.split("\n");
  const first = answers.shift();
  return first.split("").filter((c) => answers.every((a) => a.includes(c)))
    .length;
};

test("Part 2 given examples", () => {
  expect(countYes("abc")).toEqual(3);
  expect(countYes("a\nb\nc")).toEqual(0);
  expect(countYes("ab\nac")).toEqual(1);
  expect(countYes("a\na\na\na")).toEqual(1);
  expect(countYes("b")).toEqual(1);
});

const sumOfYes = (lines) =>
  lines.map((line) => countYes(line)).reduce((acc, count) => acc + count);

test("Part 2 sum of yes", () => {
  const lines = ["abc", "a\nb\nc", "ab\nac", "a\na\na\na", "b"];
  expect(sumOfYes(lines)).toEqual(3 + 0 + 1 + 1 + 1);
});

test("Part 1 result", () => {
  expect(sumOfYes(entriesDay06)).toEqual(3178);
});
