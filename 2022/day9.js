const fs = require('fs');
const _ = require('lodash');

function run(inputFile = 'day9.txt') {
  const moves = fs.readFileSync(inputFile, 'utf8').trimEnd()
    .split('\n').map(x => x.split(' ')).map(y => [y[0], Number(y[1])]);
  const tailSpots = new Map();  // tSpots(y => Set of x);

  const Tail = {}; // the global tail knot.

  function addTailSpot(T) {
    if (T != Tail) return; // only track the real tail.
    let row = tailSpots.get(T.y);
    if (!row) {
      row = new Set();
      tailSpots.set(T.y,row)
    }
    row.add(T.x);
  }

  function isTouching(H, T) {
    return Math.abs(T.y - H.y) <= 1 && Math.abs(T.x - H.x) <= 1 ;
  }

  function makeTouching(H, T) {
    if (T.y == H.y)
      T.x += (H.x > T.x) ? 1 : -1;
    else if (T.x == H.x)
      T.y += (H.y > T.y) ? 1 : -1;
    else {
      // move diagonal
      T.x += (H.x > T.x) ? 1 : -1;
      T.y += (H.y > T.y) ? 1 : -1;
    }
    addTailSpot(T);
  }

  function doMoves(H, knots) {
    function checkMoves() {
      let h = H;
      for (t of knots) {
        if (!isTouching(h, t)) {
          makeTouching(h, t);
          h = t;
        } else
          break;
      }
    }

    moves.forEach(([dir, steps]) => {
      switch (dir) {
        case 'R':
          for (let i = 0; i < steps; i++) {
            H.x += 1;
            checkMoves();
          }
          break;
        case 'L':
          for (let i = 0; i < steps; i++) {
            H.x += -1;
            checkMoves();
          }
          break;
        case 'U':
          for (let i = 0; i < steps; i++) {
            H.y += -1;
            checkMoves();
          }
          break;
        case 'D':
          for (let i = 0; i < steps; i++) {
            H.y += 1;
            checkMoves();
          }
          break;
      }
    });
  }

  function getPositions(debug = false) {
    let total = 0;
    for (const [y, x] of tailSpots.entries()) {
      total += x.size;
      if (debug) {
        for (const spot of x.values())
          console.log("T: [%d, %d]", y, spot);
      }
    }
    return total;
  }

  function part1() {
    const Head = {x:0, y:4};
    Tail.x = 0; Tail.y = 4;

    addTailSpot(Tail);
    doMoves(Head, [Tail]);
    let tailCounts = getPositions();
    console.log("Part1: Tail positions = %d", tailCounts);
  }

  function part2() {
    const H = {y:4, x:0};
    Tail.y = 4, Tail.x = 0;
    const knots = Array(8).fill('').map(x => _.clone(H));
    knots.push(Tail);
    tailSpots.clear();
    addTailSpot(Tail);
    doMoves(H, knots);
    console.log("Part 2: Tail positions = %d", getPositions());
  }

  part1();
  part2();
}

module.exports = {
  test: () => run('day9_test.txt'),
  run,
};
