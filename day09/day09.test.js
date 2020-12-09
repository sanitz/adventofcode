/*
--- Day 9: Encoding Error ---
https://adventofcode.com/2020/day/9  
*/

const example_numbers = require("fs")
  .readFileSync(`${__dirname}/example_input.txt`, "utf-8")
  .split("\n")
  .map((l) => Number.parseInt(l));

const input_numbers = require("fs")
  .readFileSync(`${__dirname}/input.txt`, "utf-8")
  .split("\n")
  .map((l) => Number.parseInt(l));

function contains_sum(arr, sum) {
  for (const num1 of arr) {
    const num2 = sum - num1;
    if (arr.includes(num2)) {
      return [num1, num2];
    }
  }
  return undefined;
}

test("Part 1 - contains_sum", () => {
  expect(182).toEqual(65 + 117);
  expect(contains_sum([65, 95, 102, 117, 150], 182)).toEqual([65, 117]);
  expect(contains_sum([95, 102, 117, 150, 182], 127)).toEqual(undefined);
});

function first_invalid_number(arr, preamble) {
  let result = undefined;
  arr.slice(preamble).some((el, idx) => {
    const arr2 = arr.slice(idx, idx + preamble);
    if (!contains_sum(arr2, el)) {
      result = el;
      return true;
    }
    return false;
  });
  return result;
}

test("Part 1 - result example", () => {
  expect(first_invalid_number(example_numbers, 5)).toEqual(127);
});

test("Part 1 - result", () => {
  expect(first_invalid_number(input_numbers, 25)).toEqual(133015568);
});

/*
--- Part Two ---
*/

function find_range(arr, expected_sum) {
  let result = undefined;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let y = i + 1; y < arr.length - 1; y++) {
      const current = arr.slice(i, y);
      const sum = current.reduce((acc, el) => acc + el);
      if (sum === expected_sum) {
        result = current;
        i = arr.length;
        y = arr.length;
      } else if (sum > expected_sum) {
        y = arr.length;
      }
    }
  }
  return result;
}

function encryptionWeakness(numbers, preamble) {
  const invalid_number = first_invalid_number(numbers, preamble);
  const range = find_range(numbers, invalid_number);
  return Math.min(...range) + Math.max(...range);
}

test("Part 2 - result example", () => {
  expect(encryptionWeakness(example_numbers, 5)).toEqual(62);
});

test("Part 2 - result", () => {
  expect(encryptionWeakness(input_numbers, 127)).toEqual(16107959);
});
