/*
--- Day 4: Passport Processing ---
https://adventofcode.com/2020/day/4
*/

const scanEntry = (text) =>
  text
    .split(/\s+/g)
    .map((e) => e.split(/:/))
    .reduce((a, [k, v]) => ((a[k] = v), a), {});

test("Part 1 scan an entry", () => {
  let entry = scanEntry("ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\neyr:2024");
  expect(entry).toEqual({
    ecl: "gry",
    pid: "860033327",
    eyr: "2020",
    hcl: "#fffffd",
    eyr: "2024",
  });
});

const isValidEntry = (e) => {
  const keys = Object.keys(e);
  return keys.length === (keys.includes("cid") ? 8 : 7);
};

const isValid = (txt) => {
  return isValidEntry(scanEntry(txt));
};

test("Part 1 Given entries", () => {
  expect(
    isValid(
      "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\nbyr:1937 iyr:2017 cid:147 hgt:183cm"
    )
  ).toBeTruthy();

  expect(
    isValid(
      "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\n  hcl:#cfa07d byr:1929"
    )
  ).toBeFalsy();

  expect(
    isValid(
      "hcl:#ae17e1 iyr:2013\neyr:2024\necl:brn pid:760753108 byr:1931\nhgt:179cm"
    )
  ).toBeTruthy();

  expect(
    isValid("hcl:#cfa07d eyr:2025 pid:166559648\niyr:2011 ecl:brn hgt:59in")
  ).toBeFalsy();
});

const entriesDay04 = require("fs")
  .readFileSync(__dirname + "/input.txt", "utf-8")
  .split(/\n\n+/)
  .map((line) => scanEntry(line));

test("Part 1 result", () => {
  expect(entriesDay04.length).toEqual(285);
  expect(entriesDay04.filter((e) => isValidEntry(e)).length).toEqual(208);
});

/*
--- Part Two ---
https://adventofcode.com/2020/day/4
*/

const validByr = (e) => {
  const byr = parseInt(e.byr);
  return 1920 <= byr && byr <= 2002;
};

test("Part 2 - Test byr", () => {
  expect(validByr({ byr: "2002" })).toBeTruthy();
  expect(validByr({ byr: "2003" })).toBeFalsy();
});

const validIyr = (e) => {
  const iyr = parseInt(e.iyr);
  return 2010 <= iyr && iyr <= 2020;
};

test("Part 2 - Test iyr", () => {
  expect(validIyr({ iyr: "2011" })).toBeTruthy();
  expect(validIyr({ iyr: "2009" })).toBeFalsy();
});

const validEyr = (e) => {
  const eyr = parseInt(e.eyr);
  return 2020 <= eyr && eyr <= 2030;
};

test("Part 2 - Test eyr", () => {
  expect(validEyr({ eyr: "2020" })).toBeTruthy();
  expect(validEyr({ eyr: "2031" })).toBeFalsy();
});

const validHgt = (e) => {
  const m = e.hgt.match(/(\d+)(cm|in)/);
  if (!m) return false;
  const hgt = parseInt(m[1]);
  let min = 150,
    max = 193;
  if (m[2] === "in") {
    (min = 59), (max = 76);
  }
  return min <= hgt && hgt <= max;
};

test("Part 2 - Test hgt", () => {
  expect(validHgt({ hgt: "60in" })).toBeTruthy();
  expect(validHgt({ hgt: "190cm" })).toBeTruthy();
  expect(validHgt({ hgt: "190in" })).toBeFalsy();
  expect(validHgt({ hgt: "190in" })).toBeFalsy();
  expect(validHgt({ hgt: "190" })).toBeFalsy();
});

const validHcl = (e) => {
  return e.hcl.match(/#[0-9a-f]{6}/);
};

test("Part 2 - Test hcl", () => {
  expect(validHcl({ hcl: "#123abc" })).toBeTruthy();
  expect(validHcl({ hcl: "#123abz" })).toBeFalsy();
  expect(validHcl({ hcl: "123abc" })).toBeFalsy();
});

const validEcl = (e) => {
  return e.ecl.match(/(amb|blu|brn|gry|grn|hzl|oth)/);
};

test("Part 2 - Test ecl", () => {
  expect(validEcl({ ecl: "brn" })).toBeTruthy();
  expect(validEcl({ ecl: "wat" })).toBeFalsy();
});

const validPid = (e) => {
  return e.pid.match(/^\d{9}$/);
};

test("Part 2 - Test pid", () => {
  expect(validPid({ pid: "000000001" })).toBeTruthy();
  expect(validPid({ pid: "0123456789" })).toBeFalsy();
});

const isStrictValidEntry = (e) => {
  if (!isValidEntry(e)) return false;
  return (
    validByr(e) &&
    validIyr(e) &&
    validEyr(e) &&
    validHgt(e) &&
    validHcl(e) &&
    validEcl(e) &&
    validPid(e)
  );
};

test("Part 2 strict invalid entries", () => {
  expect(
    isStrictValidEntry(
      scanEntry(
        "eyr:1972 cid:100\nhcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926"
      )
    )
  ).toBeFalsy();

  expect(
    isStrictValidEntry(
      scanEntry(
        "iyr:2019 hcl:#602927 eyr:1967 hgt:170cm ecl:grn pid:012533040 byr:1946"
      )
    )
  ).toBeFalsy();

  expect(
    isStrictValidEntry(
      scanEntry(
        "hcl:dab227 iyr:2012 ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277"
      )
    )
  ).toBeFalsy();

  expect(
    isStrictValidEntry(
      scanEntry(
        "hgt:59cm ecl:zzz eyr:2038 hcl:74454a iyr:2023 pid:3556412378 byr:2007"
      )
    )
  ).toBeFalsy();
});

test("Part 2 strict valid entries", () => {
  expect(
    isStrictValidEntry(
      scanEntry(
        "pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\nhcl:#623a2f"
      )
    )
  ).toBeTruthy();

  expect(
    isStrictValidEntry(
      scanEntry(
        "eyr:2029 ecl:blu cid:129 byr:1989\niyr:2014 pid:896056539 hcl:#a97842 hgt:165cm"
      )
    )
  ).toBeTruthy();

  expect(
    isStrictValidEntry(
      scanEntry(
        "hcl:#888785\nhgt:164cm byr:2001 iyr:2015 cid:88\npid:545766238 ecl:hzl\neyr:2022"
      )
    )
  ).toBeTruthy();

  expect(
    isStrictValidEntry(
      scanEntry(
        "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
      )
    )
  ).toBeTruthy();
});

test("Part 2 result", () => {
  expect(entriesDay04.length).toEqual(285);
  expect(entriesDay04.filter((e) => isStrictValidEntry(e)).length).toEqual(167);
});
