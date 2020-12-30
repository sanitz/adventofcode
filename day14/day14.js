/*
--- Day 14: Docking Data ---
https://adventofcode.com/2020/day/14
*/

const assert = require("assert").strict;

function part1(name) {
  const memory = {};
  let mask_0, mask_1;

  require("fs")
    .readFileSync(`${__dirname}/${name}`, "utf-8")
    .split("\n")
    .forEach((line) => {
      if (line.startsWith("mask")) {
        const { groups } = /^mask = (?<mask>.*)$/.exec(line);
        const mask = [...groups.mask];
        mask_1 = parseInt(mask.map((c) => (c === "X" ? "0" : c)).join(""), 2);
        mask_0 = parseInt(mask.map((c) => (c === "X" ? "1" : c)).join(""), 2);
        if (mask_1 < 0 || mask_0 < 0) {
          throw Error("WTF");
        }
      } else {
        const { groups } = /^mem\[(?<address>\d+)\] = (?<value>\d+)$/.exec(
          line
        );
        const address = parseInt(groups.address);
        const value = parseInt(groups.value);
        const newValue = (value | mask_1) & mask_0;
        if (newValue < 0) {
          console.log(value);
          console.log(mask_1);
          console.log(value | mask_1);
        }
        memory[address] = newValue;
      }
    });
  return Array.from(Object.values(memory)).reduce((acc, v) => acc + v);
}

console.log("--- Day 14: Docking Data ---");

assert.strictEqual(part1("example_input.txt"), 165);

console.log(part1("input.txt"));

console.log("--- Part 2 ---");
