const fs = require('fs');
const _ = require('lodash');
"use strict";

function run(inputFile = 'day10.txt') {
  let instructions = fs.readFileSync(inputFile, 'utf8').trimEnd()
    .split('\n')
    .map(x => x.split(' '))
    .map(([cmd, val]) => [cmd, cmd != "noop" ? Number(val) : 0]);

  let cycle = 0;
  let regX = 1;
  let screen = [];
  let line = [];
  let captureAt = 20;
  let sumStrength = 0;
  for (let i = 0; i < instructions.length; i++) {
    const [action, value] = instructions[i];
    checkSprite();
    // after the cycle
    if (captureAt == cycle) {
      captureAt += 40;
      sumStrength += cycle * regX;
    }

    if (action === "addx") {
      checkSprite();
      // during the cycle.
      if (captureAt == cycle) {
        captureAt += 40;
        sumStrength += cycle * regX;
      }
      regX += value; // cycle is over.
    }
  }

  function checkSprite() {
    const col = cycle % 40;
    line.push((col >= (regX-1) && col <= regX+1) ? '#' : ' ')
    cycle++;
    if (cycle % 40 === 0) {
      screen.push(line);
      line = [];
    }
  }
  console.log('Part 1: strength sum', sumStrength);
  console.log('Part2:');
  for (const l of screen)
    console.log(l.join(''));
}

module.exports = {
  test: () => run('day10_test.txt'),
  run,
};
