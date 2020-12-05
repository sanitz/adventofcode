/*
--- Day 5: Binary Boarding ---
https://adventofcode.com/2020/day/5
**/

const binaryCounter = (lookupChar) => (str) => {
  return str
    .split("")
    .reverse()
    .reduce((acc, char, index) => {
      if (char === lookupChar) {
        acc = acc + 2 ** index;
      }
      return acc;
    }, 0);
};

const row = binaryCounter("B");

test("Part 01 row", () => {
  expect(row("BFFFBBF")).toEqual(70);
  expect(row("BBFFBBF")).toEqual(102);
});

const column = binaryCounter("R");

test("Part 01 column", () => {
  expect(column("RLR")).toEqual(5);
  expect(column("RRR")).toEqual(7);
});

const boardingPass = (str) => {
  const r = row(str.slice(0, 7));
  const c = column(str.slice(7, 10));
  return { row: r, column: c, seatID: r * 8 + c };
};

test("Part 01 ", () => {
  expect(boardingPass("FBFBBFFRLR")).toEqual({
    row: 44,
    column: 5,
    seatID: 357,
  });
});

test("Part 01 BFFFBBFRRR: row 70, column 7, seat ID 567.", () => {
  expect(boardingPass("BFFFBBFRRR")).toEqual({
    row: 70,
    column: 7,
    seatID: 567,
  });
});
test("Part 01 FFFBBBFRRR: row 14, column 7, seat ID 119.", () => {
  expect(boardingPass("FFFBBBFRRR")).toEqual({
    row: 14,
    column: 7,
    seatID: 119,
  });
});
test("Part 01 BBFFBBFRLL: row 102, column 4, seat ID 820", () => {
  expect(boardingPass("BBFFBBFRLL")).toEqual({
    row: 102,
    column: 4,
    seatID: 820,
  });
});

const entriesDay05 = require("fs")
  .readFileSync(__dirname + "/input.txt", "utf-8")
  .split(/\n+/)
  .map((line) => boardingPass(line));

test("Part 1 result", () => {
  expect(entriesDay05.length).toEqual(936);
  expect(entriesDay05.reduce((acc, e) => Math.max(acc, e.seatID), 0)).toEqual(
    963
  );
});

/*
--- Part Two ---
*/
test("Part 2 result", () => {
  const seatIDs = entriesDay05.reduce((acc, e) => acc.concat(e.seatID), []);
  const free = seatIDs.find(
    (id) => !seatIDs.includes(id + 1) && seatIDs.includes(id + 2)
  ) + 1;
  expect(free).toEqual(592);
});
