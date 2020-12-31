/*
--- Day 13: Shuttle Search ---
https://adventofcode.com/2020/day/13
*/

const assert = require("assert").strict;

const read_timetable = (name) => {
  const data = require("fs")
    .readFileSync(`${__dirname}/${name}`, "utf-8")
    .split("\n");
  const departure = Number.parseInt(data[0]);
  const times = data[1].split(",").map((e) => Number.parseInt(e));
  return [departure, times];
};

function part1(name) {
  let departure, times;
  [departure, times] = read_timetable(name);
  times = times
    .filter((e) => !isNaN(e))
    .map((id) => ({ id, wait: id * Math.ceil(departure / id) - departure }));
  const sorted = times.sort((a, b) => a.wait - b.wait);
  return sorted[0].id * sorted[0].wait;
}

console.log("--- Day 13: Shuttle Search ---");

assert.strictEqual(part1("example_input.txt"), 295);

console.log(part1("input.txt"));

console.log("--- Part 2 ---");

function exgcd(a, b) {
  if (b == 0) return [a, 1, 0];
  let [g, u, v] = exgcd(b, a % b);
  let q = Math.floor(a / b);
  return [g, v, u - q * v];
}

function crt(mods, rests) {
  if (mods.length == 1) return [mods[0], rests[0]];
  let k = Math.floor(mods.length / 2);
  let [m1, a] = crt(mods.slice(0, k), rests.slice(0, k));
  let [m2, b] = crt(mods.slice(k), rests.slice(k));
  let [g, u, v] = exgcd(m1, m2);
  let x = (((b - a) * u) % m2) * m1 + a;
  return [m1 * m2, x];
}

function part2(name) {
  const busses = require("fs")
    .readFileSync(`${__dirname}/${name}`, "utf-8")
    .split("\n")[1]
    .split(",")
    .map((n, idx) => ({ id: parseInt(n), offset: idx }))
    .filter((o) => !isNaN(o.id));
  const mods = busses.map((b) => b.id);
  const rests = busses.map((b) => b.id - b.offset);

  let [a, b] = crt(mods, rests);
  while (b < 0) {
    b = b + a;
  }
  return b;
}

assert.strictEqual(part2("example_input.txt"), 1068781);

console.log(part2("input.txt"));
