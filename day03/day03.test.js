/*
--- Day 3: Toboggan Trajectory ---
https://adventofcode.com/2020/day/3
**/

const isTree = (line, col) => line[col % line.length] === "#";

const defaultSlope = { right: 3, down: 1 };

test("Part 1 test for tree in line", () => {
  expect(isTree(".", 0)).toBeFalsy();
  expect(isTree("#", 0)).toBeTruthy();

  expect(isTree("#.", 1)).toBeFalsy();
  expect(isTree(".#", 1)).toBeTruthy();

  expect(isTree("#.", 3)).toBeFalsy();
  expect(isTree(".#", 3)).toBeTruthy();

  expect(isTree("..##.......", 0)).toBeFalsy();
  expect(isTree("#...#...#..", 3)).toBeFalsy();
  expect(isTree(".#....#..#.", 6)).toBeTruthy();
});

const exampleGridGiven = [
  "..##.......",
  "#...#...#..",
  ".#....#..#.",
  "..#.#...#.#",
  ".#...##..#.",
  "..#.##.....",
  ".#.#.#....#",
  ".#........#",
  "#.##...#...",
  "#...##....#",
  ".#..#...#.#",
];

function countTreesProcedural(grid, slope = defaultSlope) {
  let result = 0;
  let row = 0;
  let col = 0;
  while (row < grid.length) {
    if (isTree(grid[row], col)) {
      result = result + 1;
    }
    col = col + slope.right;
    row = row + slope.down;
  }
  return result;
}

const countTreesFunctional = (grid, slope = defaultSlope) =>
  grid
    .filter((line, row) => row % slope.down === 0)
    .filter((line, row) => isTree(line, slope.right * row)).length;

//const countTrees = countTreesProcedural;
const countTrees = countTreesFunctional;

test("Part 1 count trees", () => {
  expect(countTrees([])).toEqual(0);
  expect(countTrees(["..##......."])).toEqual(0);

  expect(countTrees(["..##.......", "#...#...#..", ".#....#..#."])).toEqual(1);

  expect(countTrees(exampleGridGiven)).toEqual(7);
});

const gridDay03 = require("fs")
  .readFileSync(__dirname + "/input.txt", "utf-8")
  .split("\n");

test("Part 1 result", () => {
  expect(countTrees(gridDay03)).toEqual(159);
});

/*
--- Part Two ---
https://adventofcode.com/2020/day/3
*/

const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

test("Part 2 results given slopes", () => {
  expect(countTrees(exampleGridGiven, slopes[0])).toEqual(2);
  expect(countTrees(exampleGridGiven, slopes[1])).toEqual(7);
  expect(countTrees(exampleGridGiven, slopes[2])).toEqual(3);
  expect(countTrees(exampleGridGiven, slopes[3])).toEqual(4);
  expect(countTrees(exampleGridGiven, slopes[4])).toEqual(2);
});

const sumOfSlopes = (grid, slopes) =>
  slopes.reduce((val, slope) => countTrees(grid, slope) * val, 1);

test("Part 2 sum of given slopes", () => {
  expect(sumOfSlopes(exampleGridGiven, slopes)).toEqual(336);
});

test("Part 2 result", () => {
  expect(sumOfSlopes(gridDay03, slopes)).toEqual(6419669520);
});
