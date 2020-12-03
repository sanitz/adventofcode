/*
--- Day 3: Toboggan Trajectory ---
With the toboggan login problems resolved, you set off toward the airport. While travel by toboggan might be easy, it's certainly not safe: there's very minimal steering and the area is covered in trees. You'll need to see which angles will take you near the fewest trees.

Due to the local geology, trees in this area only grow on exact integer coordinates in a grid. You make a map (your puzzle input) of the open squares (.) and trees (#) you can see. For example:

..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
These aren't the only trees, though; due to something you read about once involving arboreal genetics and biome stability, the same pattern repeats to the right many times:

..##.........##.........##.........##.........##.........##.......  --->
#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....  --->
.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#  --->
You start on the open square (.) in the top-left corner and need to reach the bottom (below the bottom-most row on your map).

The toboggan can only follow a few specific slopes (you opted for a cheaper model that prefers rational numbers); start by counting all the trees you would encounter for the slope right 3, down 1:

From your starting position at the top-left, check the position that is right 3 and down 1. Then, check the position that is right 3 and down 1 from there, and so on until you go past the bottom of the map.

The locations you'd check in the above example are marked here with O where there was an open square and X where there was a tree:

..##.........##.........##.........##.........##.........##.......  --->
#..O#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....X..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#O#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..X...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.X#.......#.##.......#.##.......#.##.......#.##.....  --->
.#.#.#....#.#.#.#.O..#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........X.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.X#...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...#X....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...X.#.#..#...#.#.#..#...#.#.#..#...#.#  --->
In this example, traversing the map using this slope would cause you to encounter 7 trees.

Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?
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
    if (isTree(grid[row], col)) result = result + 1;
    col = col + slope.right;
    row = row + slope.down;
  }
  return result;
}

const t = (f, v) => {
  f && v;
};

const countTreesFunctional = (grid, slope = defaultSlope) =>
  grid
    .filter((line, idx) => idx % slope.down === 0)
    .reduce((acc, line, idx) => (isTree(line, slope.right * idx) ? 1 : 0) + acc, 0);


const countTrees = countTreesFunctional;

test("Part 1 count trees", () => {
  expect(countTrees([])).toEqual(0);
  expect(countTrees(["..##......."])).toEqual(0);

  expect(countTrees(["..##.......", "#...#...#..", ".#....#..#."])).toEqual(1);

  expect(countTrees(exampleGridGiven)).toEqual(7);
});

const fs = require("fs");
const gridDay03 = fs
  .readFileSync(__dirname + "/input.txt", "utf-8")
  .split("\n");

test("Part 1 result", () => {
  expect(countTrees(gridDay03)).toEqual(159);
});

/*
--- Part Two ---
Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop, after all.

Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

What do you get if you multiply together the number of trees encountered on each of the listed slopes?
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
