/*
--- Day 11: Seating System ---
https://adventofcode.com/2020/day/11 
*/

const occupied = "#";
const available = "L";
const is_occupied = (s) => s === occupied;
const is_available = (s) => s === available;

const read_seats = (name) =>
  require("fs")
    .readFileSync(`${__dirname}/${name}`, "utf-8")
    .split("\n")
    .map((l) => l.split(""));

const example = read_seats("example_input.txt");
const input = read_seats("input.txt");
const count_occupied = (matrix) => matrix.flat().filter(is_occupied).length;

function visibleOccupiedSeatsAdjacent(seats, x, y, part = 1) {
  let max_offset = part === 1 ? 1 : Math.max(seats.length, seats[0].length);
  let result = 0;

  for (x_offset of [-1, 0, 1]) {
    for (y_offset of [-1, 0, 1]) {
      for (let offset = 1; offset <= max_offset; offset++) {
        const seat = seats[x + x_offset * offset]?.[y + y_offset * offset];
        if (!(x_offset === 0 && y_offset === 0) && seat !== undefined) {
          if (is_available(seat)) {
            offset = max_offset;
          } else if (is_occupied(seat)) {
            offset = max_offset;
            result++;
          }
        }
      }
    }
  }
  return result;
}
function noOccupiedSeatsAdjacent(seats, x, y, part = 1) {
  return visibleOccupiedSeatsAdjacent(seats, x, y, part) === 0;
}
function tooManySeatsAdjacentOccupied(seats, x, y, part = 1) {
  let max_neighbours = part === 1 ? 4 : 5;
  return visibleOccupiedSeatsAdjacent(seats, x, y, part) >= max_neighbours;
}

function next_seats(seats, part = 1) {
  let next = seats.map((row) => row.slice());
  let changed = true;

  let runs = 0;
  while (changed) {
    runs++;
    changed = false;
    let previous = next.map((row) => row.slice());

    previous.forEach((row, x) => {
      row.forEach((seat, y) => {
        if (
          is_available(seat) &&
          noOccupiedSeatsAdjacent(previous, x, y, part)
        ) {
          next[x][y] = occupied;
          changed = true;
        } else if (
          is_occupied(seat) &&
          tooManySeatsAdjacentOccupied(previous, x, y, part)
        ) {
          next[x][y] = available;
          changed = true;
        }
      });
    });

    if (runs > 1000) {
      console.error("WTF?! runs > 100?");
      break;
    }
  }
  return next;
}

console.log("--- Day 11: Seating System - Part 1 ---");

let count = count_occupied(next_seats(example));
console.log("Example: " + count);

count = count_occupied(next_seats(input));
console.log("Result Part 1: " + count);

console.log("--- Day 11: Seating System - Part 2 ---");

count = count_occupied(next_seats(example, 2));
console.log("Example Part 2: " + count);

count = count_occupied(next_seats(input, 2));
console.log("Result Part 2: " + count);
