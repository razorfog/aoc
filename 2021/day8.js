const fs = require('fs');

const DIGIT_SEGS = new Map([
  ['0', "abcefg"],
  ['1', "cf"],
  ['2', "acdeg"],
  ['3', "acdfg"],
  ['4', "bcdf"],
  ['5', "abdfg"],
  ['6', "abdefg"],
  ['7', "acf"],
  ['8', "abcdefg"],
  ['9', "abcdfg"]
]);


const LEN_MAP = new Map();
for (let [k, val] of DIGIT_SEGS.entries()) {
  const len = val.length;
  let v = LEN_MAP.get(len);
  if (!v) v = [];
  v.push(k)
  LEN_MAP.set(len, v);
}

const UNIQUE_MAP = new Map();
for (let [k, val] of LEN_MAP.entries()) {
  if (val.length == 1)
    UNIQUE_MAP.set(k, val[0]);
}

function isUnique(n) {
  return UNIQUE_MAP.get(n) != undefined;
}


function readPatterns(lines) {
  let total = 0;
  for (const [, outputs] of lines) {
    total += outputs.reduce((a, b) => a + (isUnique(b.length) ? 1 : 0), 0);
    for (o of outputs) {
      const digit = UNIQUE_MAP.get(o.length);
      if (digit) {
        const str = DIGIT_SEGS.get(digit);
        const booya = o.split('').sort().join('');
        console.log("Unique %s is dig %s. pattern %s. unique sorted: %s", o, digit, str, booya);
      }
    }
  }
  console.log("Total output uniques: %d", total);
}

function solve2(lines) {
  const charCountSumToDigit = {
    17: 1,
    25: 7,
    30: 4,
    34: 2,
    37: 5,
    39: 3,
    41: 6,
    42: 0,
    45: 9,
    49: 8,
  };

  let sum = 0;
  for (const [signals, outputs] of lines) {
    const charCount = {};
    const stuff = signals.join('');
    console.log("SIGS: ", stuff);
    for (const char of stuff) {
      charCount[char] = (charCount[char] ?? 0) + 1;
    }
    console.log("CHAR COUNTS: ", charCount);
    sum += +outputs
      .map(
        (output) => {
          console.log("OUTPUT SIG: ", output);
          const xxx1 = output
              .split('')
              .map((char) => charCount[char]);
          const final = xxx1.reduce((acc, count) => acc + count);
          console.log("Char counts:", xxx1);
          console.log("%s: sum of counts = %d => %s", output, final, charCountSumToDigit[final]);
          return charCountSumToDigit[final];
        })
      .join('');
  }
  console.log('Part2:',sum);
}

function run(inputFile = './day8.input') {
  const lines = fs.readFileSync(inputFile, 'utf8')
    .split('\n').filter(Boolean)
    .map((line) => line.split(' | ').map((s) => s.split(' ')));
  // readPatterns(lines);
  const exampleSignals =
    'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab';

  const charCount = {};
  for (const char of exampleSignals
    .split('')
    .filter((char) => /[a-g]/.test(char))) {
    charCount[char] = (charCount[char] ?? 0) + 1;
  }
  console.log("CHAR COUNT:", charCount);
  function charCountSum(signal) {
    return signal.split('').reduce((acc, char) => acc + charCount[char], 0);
  }

  const charCountSumToDigit = {
    [charCountSum('acedgfb')]: 8,
    [charCountSum('cdfbe')]: 5,
    [charCountSum('gcdfa')]: 2,
    [charCountSum('fbcad')]: 3,
    [charCountSum('dab')]: 7,
    [charCountSum('cefabd')]: 9,
    [charCountSum('cdfgeb')]: 6,
    [charCountSum('eafb')]: 4,
    [charCountSum('cagedb')]: 0,
    [charCountSum('ab')]: 1,
  };

  console.log(JSON.stringify(charCountSumToDigit,0,2));

   solve2(lines);
}

run('day8.input');
// run();
