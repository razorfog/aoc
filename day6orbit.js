
const _ = require('lodash');
const { getInput } = require('./aocUtils');

const SEP = ')';

class Orbits {
  constructor(f = './day6orbits.txt') {
    this.orbits = getInput(f);
    this.satalites = new Map(); // satilite orbits this.
    this.directs = this.orbits.length; // assume unique?
    this.orbits.forEach(o => {
      const [com, sat] = o.split(SEP);
      this.satalites.set(sat, com);
    });
  }


  findPath(from = 'YOU', to = 'SAN') {
    const fromOrbit = this.satalites.get(from);
    const satFinish = this.satalites.get(to);
    console.log('%s -> %s. Is %s -> %s', from, to, fromOrbit, satFinish);
    const visited = new Set().add(from);
    let moves = [];
    let finished = false;
    // need a forward graph.
    const coms = new Map();
    this.orbits.forEach(o => {
      const [com, sat] = o.split(SEP);
      let comOrbits = coms.get(com);
      if (!comOrbits) {
        comOrbits = [sat];
        coms.set(com,comOrbits);
      } else {
        comOrbits.push(sat);
      }
    });
    const bfs = (at) => {
      const previous = this.satalites.get(at);
      if (!visited.has(previous)) {
        visited.add(previous);
        moves.push([at, previous]);
        if (previous === satFinish) {
          return true;
        }
        if (bfs(previous)) {
          return true;
        } else {
          // remove the moves
          moves.pop();
        }
      }
      // now check forward direction.
      const forwards = coms.get(at);
      if (!forwards) {
        return false;
      }
      for (let i = 0; i < forwards.length; i++) {
        const f = forwards[i];
        if (visited.has(f)) {
          continue;
        }
        visited.add(f);
        moves.push([at, f]);
        if (f == satFinish) {
          return true;
        }
        if (bfs(f)) {
          return true;
        } else {
          moves.pop();
        }
      }
      return false;
    }
    if (bfs(fromOrbit)) {
      console.log("Found it %d moves:\n", moves.length);
      moves.forEach(m => console.log(" - %s => %s", m[0],m[1]));
      return moves.length;
    } else {
      console.log("Didn't find it");
      return 0;
    }
  }

  calcIndirects(sat, visited) {
    const com = this.satalites.get(sat);
    if (!com || visited.has(com)) {
      return 0;
    }
    return 1 + this.calcIndirects(com, visited);
  }

  calcOrbits() {
    let indirects = 0;
    for (let [sat, com] of this.satalites) {
      indirects += this.calcIndirects(com, new Set().add(sat))
    }
    console.log('directs: %d, indirects %d', this.directs, indirects);
    return this.directs + indirects;
  }
}

const day6test2 = () => {
  console.log('--- Day 6 test 2')
  const rv = new Orbits().findPath();
  console.log('Total: ', rv);
}

const day6test1 = () => {
  console.log('--- Day 6 test 1')
  const rv = new Orbits().calcOrbits();
  console.log('Total: ', rv);
}

module.exports = {
  Orbits,
  day6test1,
  day6test2,
  day6runTests: () => {day6test1(); day6test2(); }
};
