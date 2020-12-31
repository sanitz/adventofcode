/*
--- Day 21: Allergen Assessment ---
https://adventofcode.com/2020/day/21
*/

const assert = require("assert").strict;

function part1(name) {
  let receipes = [];
  const ingridentsOfAllergenes = new Map();
  const allAllergenes = new Set();
  const dangerousList = [];
  const ingridientsWithNoAllergenes = new Set();
  const ingridentsCount = new Map();
  const result = {};

  const lineEx = /(?<ingridients>.+) \(contains (?<allergenes>.+)\)/;
  require("fs")
    .readFileSync(`${__dirname}/${name}`, "utf-8")
    .split("\n")
    .forEach((line) => {
      const g = lineEx.exec(line).groups;
      const ingridients = g.ingridients.split(" ");
      const allergenes = g.allergenes.split(", ");
      receipes.push({
        ingridients,
        allergenes,
      });
      allergenes.forEach((allergene) => allAllergenes.add(allergene));

      for (const ingridient of ingridients) {
        ingridentsCount.set(
          ingridient,
          ingridentsCount.has(ingridient)
            ? ingridentsCount.get(ingridient) + 1
            : 1
        );
      }

      for (const allergene of allergenes) {
        if (ingridentsOfAllergenes.has(allergene)) {
          ingridentsOfAllergenes.set(
            allergene,
            new Set(
              ingridients.filter((i) =>
                ingridentsOfAllergenes.get(allergene).has(i)
              )
            )
          );
        } else {
          ingridentsOfAllergenes.set(allergene, new Set(ingridients));
        }
      }
    });

  while (ingridentsOfAllergenes.size > 0) {
    for (const [alergene, ingridients] of ingridentsOfAllergenes.entries()) {
      if (ingridients.size === 1) {
        const ingridient = ingridients.values().next().value;
        result[alergene] = ingridient;
        dangerousList.push(ingridient);
        ingridentsCount.delete(ingridient);
        allAllergenes.delete(alergene);
        ingridentsOfAllergenes.delete(alergene);
        for (const ingridients of ingridentsOfAllergenes.values()) {
          ingridients.delete(ingridient);
        }
      }
    }
  }

  const p1 = Array.from(ingridentsCount.values()).reduce((a, v) => a + v);
  return [p1, dangerousList.sort().join(",")];
}

console.log("--- Day 21: Allergen Assessment ---");

// console.log(part1("example_input.txt"));

const [p1ex, p2ex] = part1("example_input.txt");
assert.strictEqual(p1ex, 5);
assert.strictEqual(p2ex, 5);

//console.log(part1("input.txt"));

console.log("--- Part 2 ---");
