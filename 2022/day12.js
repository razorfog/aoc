const fs = require('fs');
const _ = require('lodash');

function partie(inputFile = 'day12.txt', allStarts = false) {
  const a = 'a'.charCodeAt(0);
  let startPos = [];
  let endPos;
  const grid = fs.readFileSync(inputFile, 'utf8').trimEnd()
    .split('\n')
    .map((line, row) => line.split('').map((c, col) => {
      let h = c.charCodeAt(0) - a; // height.
      if (c === 'S' || (allStarts && c === 'a')) {
        h = 0;
        startPos.push([row, col]);
      } else if (c === 'E') {
        h = 25;
        endPos = [row, col];
      }
      return h;
    }));

  console.log("Start at %s => %s", startPos, endPos);
  const MOVES = [[1,0],[-1,0],[0,1],[0,-1]];
  // following the dikstra algorithm for shortest path.
  // tracking the path just for fun, totally unnecessary expense.
  const queue = startPos.map(pos => ({steps: 0, pos, path: [[pos[0], pos[1]]]}));
  const visited = [];
  while(queue.length > 0) {
    const {pos: [row, col], steps, path} = queue.shift();
    if (visited[row]?.[col])
      continue;
    if (endPos[0] === row && endPos[1] === col) {
      return {steps, path};
      break;
    }
    const h = grid[row][col] + 1;
    for (const [y, x] of MOVES) {
      if (grid[row+y]?.[col+x] === undefined ||
          grid[row+y][col+x] > h ||
          visited[row+y]?.[col+x]) {
        continue;
      }
      // capturing the path just for fun.
      const xpath = _.clone(path);
      xpath.push([row+y, col+x]);
      queue.push({ pos: [row+y, col+x], steps: steps+1, path: xpath});
    }
    visited[row] = visited[row] ?? [];
    visited[row][col] = true;
  }
  return {steps: -1, path: []}; // didn't find it.
}

function run(inputFile = 'day12.txt') {
  [1, 2].forEach(x => {
    const {steps, path} = partie(inputFile, x === 2);
    console.log("Part%d: steps = %d", x, steps);
    console.log("Part%d: path: %s", x, JSON.stringify(path));
  });
}

run('day12.txt');
module.exports = {
  test: () => run('day12_test.txt'),
  run,
};
