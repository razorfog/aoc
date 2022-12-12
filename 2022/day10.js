const fs = require('fs');
const _ = require('lodash');
"use strict";

function run(inputFile = 'day10.txt') {
  const CycleMap = {
    addx: 2,
    noop: 1
  };
  let totalCycles = 1;
  const instructions = fs.readFileSync(inputFile, 'utf8').trimEnd()
    .split('\n')
    .map(x => x.split(' '))
    .map(([cmd, val]) => {
      const execAt = totalCycles;
      const thing = {
        execAt,
        cmd,
        arg: cmd === 'noop' ? 0 : Number(val)
      };
      totalCycles += CycleMap[cmd];
      return thing;
    });
  console.log("Total cycles: %d", totalCycles);
  let regX = 1;
  let cycle = 0;
  const captureAt = [20, 60, 100, 140, 180, 220, Number.MAX_VALUE];
  let sumStrength = 0;
  for ( ; cycle < totalCycles; cycle += 1) {
    if (captureAt[0] == cycle) {
      captureAt.shift();
      sumStrength += cycle * regX;
    }
    if (instructions[0] && instructions[0].execAt == cycle) {
      const {cmd, arg} = instructions.shift();
      if (cmd == "addx" && (2+cycle) > captureAt[0]) {
        const cap = captureAt.shift();
        sumStrength += cap * regX;
      }
      regX += arg;
    }
  }
  console.log("Part 1: Sum strength: %d", sumStrength);
}


module.exports = {
  test: () => run('day10_test.txt'),
  run,
};
