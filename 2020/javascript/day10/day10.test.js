/*
--- Day 10: Adapter Array ---
https://adventofcode.com/2020/day/10
*/

const read_numbers = (name) =>
  require("fs")
    .readFileSync(`${__dirname}/${name}`, "utf-8")
    .split("\n")
    .map((l) => Number.parseInt(l));

const example = read_numbers("example_input.txt");
const example2 = read_numbers("example2_input.txt");
const input = read_numbers("input.txt");

const sorted = (nums) => {
  let result = nums.slice();
  result.push(0);
  result.push(Math.max(...nums) + 3);
  return result.sort((a, b) => a - b);
};

function diffs(adapters) {
  let nums = sorted(adapters);
  const counter = new Array(4).fill(0);
  for (let i = 0; i < nums.length - 1; i++) {
    const d = nums[i + 1] - nums[i];
    counter[d]++;
  }
  return counter[1] * counter[3];
}

test("Part 1 - example 1", () => {
  expect(diffs(example)).toEqual(35);
});

test("Part 1 - example 2", () => {
  expect(diffs(example2)).toEqual(220);
});

test("Part 1 - result", () => {
  expect(diffs(input)).toEqual(2482);
});

/*
--- Part Two ---
*/

function next_items(nums) {
  let result = {};
  nums.forEach((val, idx) => {
    result[val] = nums.filter((x) => val < x && x <= val + 3);
  });
  return result;
}

function path_count(nums) {
  const arr = sorted(nums);
  const nexts = next_items(arr);
  const max = arr[arr.length - 1];
  const seen = {};

  const count = (val = 0) => {
    if (val === max) {
      return 1;
    }
    let result = 0;
    nexts[val].forEach((next) => {
      if (!(next in seen)) {
        seen[next] = count(next);
      }
      result += seen[next];
    });
    return result;
  };

  return count();
}

test("Part 2 - example 1", () => {
  expect(path_count(example)).toEqual(8);
});

test("Part 2 - example 2", () => {
  expect(path_count(example2)).toEqual(19208);
});

test("Part 2 - result", () => {
  expect(path_count(input)).toEqual(96717311574016);
});
