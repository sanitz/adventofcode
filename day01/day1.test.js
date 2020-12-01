/*
https://adventofcode.com/2020/day/1 - Part 1

Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

For example, suppose your expense report contained the following:

1721
979
366
299
675
1456
In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.

Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?
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

const fs = require("fs");

function entriesDay01() {
  const buffer = fs.readFileSync("input.txt", "utf-8").split("\n");
  return buffer.map((x) => Number.parseInt(x));
}

test("Result Part 1", () => {
  expect(productOfTwo(2020, entriesDay01())).toEqual(787776);
});

/*
https://adventofcode.com/2020/day/1 - Part 1

The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

In your expense report, what is the product of the three entries that sum to 2020?
*/

function productOfThree(sum, arr) {
  for (const num1 of arr) {
    for (const num2 of arr) {
      const num3 = sum - num1 - num2;
      if (arr.includes(num3)) {
        return BigInt(num3) * BigInt(num1) * BigInt(num2);
      }
    }
  }
}

test("Part 2 with no result", () => {
  expect(productOfThree(42, [1, 3, 7])).toBeUndefined();
});

test("Part 2 with simple result ", () => {
  expect(productOfThree(3 + 4 + 5, [3, 4, 5])).toEqual(BigInt(3 * 4 * 5));
});

test("Part 2 with example given", () => {
  let arr = [1721, 979, 366, 299, 675, 1456];
  expect(productOfThree(2020, arr)).toEqual(241861950n);
});

test("Result Part 2", () => {
  expect(productOfThree(2020, entriesDay01())).toEqual(262738554n);
});
