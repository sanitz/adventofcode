/*
--- Day 12: Rain Risk ---
https://adventofcode.com/2020/day/12 
*/

const DIR = {
  N: 0,
  E: 1,
  S: 2,
  W: 3,
};

const read_instructions = (name) =>
  require("fs").readFileSync(`${__dirname}/${name}`, "utf-8").split("\n");

const example = read_instructions("example_input.txt");

const input = read_instructions("input.txt");

const parse_instruction = (line) => ({
  action: line.slice(0, 1),
  value: Number.parseInt(line.slice(1)),
});

const navigate = (pos, ins) => {
  switch (ins.action) {
    case "N":
      return { ...pos, north: pos.north + ins.value };

    case "S":
      return { ...pos, north: pos.north - ins.value };

    case "E":
      return { ...pos, east: pos.east + ins.value };

    case "W":
      return { ...pos, east: pos.east - ins.value };

    case "L":
      return { ...pos, dir: (4 + pos.dir - Math.floor(ins.value / 90)) % 4 };

    case "R":
      return { ...pos, dir: (pos.dir + Math.floor(ins.value / 90)) % 4 };

    case "F":
      switch (pos.dir) {
        case DIR.N:
          return { ...pos, north: pos.north + ins.value };
        case DIR.S:
          return { ...pos, north: pos.north - ins.value };
        case DIR.E:
          return { ...pos, east: pos.east + ins.value };
        case DIR.W:
          return { ...pos, east: pos.east - ins.value };
        default:
          throw "WTF";
      }

    default:
      throw "Unknown instruction " + ins.action;
  }
};

const manhattan_distance = (pos) => Math.abs(pos.north) + Math.abs(pos.east);
const example_instructions = example.map((e) => parse_instruction(e));
const instructions = input.map((e) => parse_instruction(e));

function rotate_wp(ins, wp) {
  let deg = ins.value % 360;
  if (ins.action === "L") {
    deg = 360 - deg;
  }
  if (deg === 90) {
    return {
      east: wp.north,
      north: -1 * wp.east,
    };
  } else if (deg === 180) {
    return {
      east: -1 * wp.east,
      north: -1 * wp.north,
    };
  } else if (deg === 270) {
    return {
      east: -1 * wp.north,
      north: wp.east,
    };
  } else throw "Unknown degree";
}

const navigate_waypoint = (pos, waypoint, ins) => {
  switch (ins.action) {
    case "N":
      return [pos, { ...waypoint, north: waypoint.north + ins.value }];
    case "S":
      return [pos, { ...waypoint, north: waypoint.north - ins.value }];
    case "E":
      return [pos, { ...waypoint, east: waypoint.east + ins.value }];
    case "W":
      return [pos, { ...waypoint, east: waypoint.east - ins.value }];

    case "L":
    case "R":
      return [pos, rotate_wp(ins, wp)];

    case "F":
      return [
        {
          ...pos,
          north: pos.north + ins.value * wp.north,
          east: pos.east + ins.value * wp.east,
        },
        wp,
      ];

    default:
      throw "Unknown instruction " + ins.action;
  }
};

const start_pos = {
  dir: DIR.E,
  north: 0,
  east: 0,
};

const start_wp = {
  north: 1,
  east: 10,
};

console.log("--- Day 12: Seating System - Part 1 ---");

let p = start_pos;
for (const i of example_instructions) p = navigate(p, i);
console.log("Example: " + manhattan_distance(p));

p = start_pos;
for (const i of instructions) p = navigate(p, i);
console.log("Result: " + manhattan_distance(p));

console.log("--- Day 12: Seating System - Part 2 ---");

p = start_pos;
let wp = start_wp;
for (const i of example_instructions) [p, wp] = navigate_waypoint(p, wp, i);
console.log("Example: " + manhattan_distance(p));

p = start_pos;
wp = start_wp;

for (const i of instructions) [p, wp] = navigate_waypoint(p, wp, i);
console.log("Result: " + manhattan_distance(p));
