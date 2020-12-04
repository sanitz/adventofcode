/*
--- Day 1: Report Repair ---
https://adventofcode.com/2020/day/1 
*/

function productOfTwo(sum, arr) {
  for (const num1 of arr) {
    const num2 = sum - num1;
    if (arr.includes(num2)) {
      return num1 * num2;
    }
  }
}

test("Part 1 with no result", () => {
  expect(productOfTwo(3, [1, 3])).toBeUndefined();
});

test("Part 1 with a simple result", () => {
  expect(productOfTwo(3 + 4, [3, 4])).toEqual(3 * 4);
});

test("Part 1 with the example given", () => {
  const arr = [1721, 979, 366, 299, 675, 1456];
  expect(productOfTwo(2020, arr)).toEqual(1721 * 299);
});

function entriesDay01() {
  return require("fs")
    .readFileSync(__dirname + "/input.txt", "utf-8")
    .split("\n")
    .map((x) => Number.parseInt(x));
}

test("Result Part 1", () => {
  expect(productOfTwo(2020, entriesDay01())).toEqual(787776);
});

/*
--- Part Two ---
https://adventofcode.com/2020/day/1
*/

function productOfThree(sum, arr) {
  for (const num1 of arr) {
    for (const num2 of arr) {
      const num3 = sum - num1 - num2;
      if (arr.includes(num3)) {
        return parseInt(BigInt(num1) * BigInt(num2) * BigInt(num3));
      }
    }
  }
}

test("Part 2 with no result", () => {
  expect(productOfThree(42, [1, 3, 7])).toBeUndefined();
});

test("Part 2 with simple result ", () => {
  expect(productOfThree(3 + 4 + 5, [3, 4, 5])).toEqual(3 * 4 * 5);
});

test("Part 2 with example given", () => {
  let arr = [1721, 979, 366, 299, 675, 1456];
  expect(productOfThree(2020, arr)).toEqual(241861950);
});

test("Result Part 2", () => {
  expect();
  expect(productOfThree(2020, entriesDay01())).toEqual(262738554);
});
