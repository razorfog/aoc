
const _ = require('lodash');
const { getInput } = require('./aocUtils');

const RIGHT = "R"; // add on y plane
const UP = "U"; // add on x plane
const DOWN = "D" // down on x plane
const LEFT = "L" // decrement on y plane

class Point {
  constructor(x, y) {
    this._x = x;
    this._y = y;
    this.w1 = [];
    this.w2 = [];
    this.w1steps = 0;
    this.w2steps = 0;
    this._hash = Point.pointHash(x,y);
  }

  firstGotHere(wireNum, steps) {
    if (wireNum == 1 && this.w1steps == 0) {
      this.w1steps = steps;
    } else if (wireNum == 2 && this.w2steps == 0) {
      this.w2steps = steps;
    }
  }

  // this was unnecessary.
  addDirection(wireNum, direction) {
    if (wireNum === 1) {
      this.w1.push(direction);
    } else {
      this.w2.push(direction);
    }
  }

  get x() { return this._x; }
  get y() { return this._y; }
  get hash() { return this._hash; }
  get crosses() { return this.w1steps > 0 && this.w2steps > 0}

  static pointHash(x,y) { return `${x}:${y}`; }
}

class WireMap {
  constructor(f = "./wires.txt") {
    const lines = getInput(f);
    const wires = [];
    lines.forEach(l =>
      wires.push(l.split(',').map(m => {
        const c = m[0];
        const val = Number(m.substr(1))
        return {c, val};
      }))
    );
    this.wire1 = wires[0];
    this.wire2 = wires[1];
    this.crossings = {} // points
    this.graph = {}; // collection of Points.
  }

  addCrossing(p) {
    if (!this.crossings[p.hash]) {
      this.crossings[p.hash] = p;
    }
  }

  getPoint(x, y) {
    const hash = Point.pointHash(x,y);
    let p = this.graph[hash];
    if (!p) {
      p = new Point(x,y);
      this.graph[hash] = p;
    }
    return p;
  }

  mapWire(wirePath, wireNum = 1) {
      let x = 0, y = 0;
      let steps = 0;
      const definePoint = (m) => {
        const spot = this.getPoint(x,y);
        spot.firstGotHere(wireNum, steps);
        spot.addDirection(wireNum, m.c);
        if (spot.crosses) {
          this.addCrossing(spot);
        }
      };

      _.forEach(wirePath, m => {
        if (m.c == RIGHT || m.c == LEFT) {
          const lastX = (m.c == LEFT) ? (x - m.val) - 1 : x + m.val + 1;
          while (x != lastX) {
            definePoint(m);
            x = (m.c == LEFT) ? x - 1 : x + 1;
            steps++;
          }
          x = (m.c == LEFT) ? x + 1 : x - 1; // adjust for lastX being one outofrang
          steps--; /// adjust for lastX being on out of range
        } else {
          // DOWN or UP along a y axis.
          const lastY = (m.c == DOWN) ? (y - m.val) -1 : y + m.val + 1;
          while (y != lastY) {
            definePoint(m);
            y = (m.c == DOWN) ? y - 1 : y + 1;
            steps++;
          }
          y = (m.c == DOWN) ? y + 1 : y - 1;
          steps--;
        }
      });
  }

  checkWires() {
    this.mapWire(this.wire1, 1);
    this.mapWire(this.wire2, 2);
    let closest = Number.MAX_SAFE_INTEGER;
    let shortest = closest;

    _.forEach(this.crossings, p => {
      const length = p.w1steps + p.w2steps;
      if (length < shortest) {
        shortest = length;
      }
      const distance = Math.abs(p.x) + Math.abs(p.y);
      if (distance < closest) {
        closest = distance;
      }
    });
    return {closest, shortest};
  }
}

const allTests = (short=true, close=true) => {
  const { shortest, closest } = new WireMap().checkWires();
  if (short) {
    console.log('--- Day 3 Test 1 ---\nShortest: ', shortest);
  }
  if (close) {
    console.log('--- Day 3 Test 2 ---\nClosest: ', closest);
  }
}

const day3test1 = () => allTests(true, false);
const day3test2 = () => allTests(false, true);

module.exports = {
  WireMap,
  day3test1,
  day3test2,
  day3runTests: allTests
};
