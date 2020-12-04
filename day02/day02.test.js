/*
--- Day 2: Password Philosophy ---
https://adventofcode.com/2020/day/2
**/

function validPasswordLine(line) {
  const matchLine = line.match(/(\d+)-(\d+)\s+(\w):\s+(\w+)/);
  if (!matchLine) return false;
  const [ignore, low, high, char, password] = matchLine;
  const matchPassword = password.match(new RegExp(char, "g"));
  const count = matchPassword ? matchPassword.length : 0;
  return count >= low && count <= high;
}

test("Part 1 invalid format password line", () => {
  expect(validPasswordLine("foo")).toBeFalsy();
});

test("Part 1 given valid password lines", () => {
  expect(validPasswordLine("1-3 a: abcde")).toBeTruthy();
  expect(validPasswordLine("2-9 c: ccccccccc")).toBeTruthy();
});

test("Part 1 given invalid password line", () => {
  expect(validPasswordLine("1-3 b: cdefg")).toBeFalsy();
});

const validPasswordLines = (input) =>
  input.filter((line) => validPasswordLine(line)).length;

test("Part 1 number of given valid password lines", () => {
  const input = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];
  expect(validPasswordLines(input)).toEqual(2);
});

const fs = require("fs");

function entriesDay02() {
  return fs.readFileSync(__dirname + "/input.txt", "utf-8").split("\n");
}

test("Part 1 result", () => {
  expect(validPasswordLines(entriesDay02())).toEqual(445);
});

/*
--- Part Two ---
https://adventofcode.com/2020/day/2
*/

function validPasswordLineNew(line) {
  const matchLine = line.match(/(\d+)-(\d+)\s+(\w):\s+(\w+)/);
  if (!matchLine) return false;
  const [ignore, first, second, char, password] = matchLine;
  return (password[first - 1] === char) ^ (password[second - 1] === char);
}

test("Part 2 invalid format password line", () => {
  expect(validPasswordLineNew("foo")).toBeFalsy();
});

test("Part 2 given valid password lines", () => {
  expect(validPasswordLineNew("1-3 a: abcde")).toBeTruthy();
});

test("Part 2 given invalid password line", () => {
  expect(validPasswordLineNew("1-3 b: cdefg")).toBeFalsy();
  expect(validPasswordLineNew("2-9 c: ccccccccc")).toBeFalsy();
});

const validPasswordLinesNew = (input) =>
  input.filter((line) => validPasswordLineNew(line)).length;

test("Part 2 number of given valid password lines", () => {
  const input = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];
  expect(validPasswordLinesNew(input)).toEqual(1);
});

test("Part 2 result", () => {
  expect(validPasswordLinesNew(entriesDay02())).toEqual(491);
});
