'use strict';

class PasswordHunt {

  constructor(testnum = 1, code = '256310-732736') {
    this.range = code.split('-').map(Number);
    this.total = 0;
    this.testnum = testnum
  }

  isPass(n) {
    const d = String(n);
    let doubles = false;
    for (let i = 0; i < d.length-1; i++) {
      if (d[i] > d[i+1]) {
        return false;
      }
      if (!doubles) {
        let j = i+1;
        for ( ; j < d.length && (d[j] === d[i]); j++);
        if (j > (i+1)) {
          // for test 2 doubles can only be 2
          doubles = this.testnum === 1 || (j-i) == 2;
          i = j-2; // -2 cuz i++ above
        }
      }
    }
    return doubles; // if true its a pss
  }

  run() {
    this.total = 0;
    for(let i = this.range[0]; i < this.range[1]; i++) {
      if (this.isPass(i)) {
        this.total++;
      }
    }
    console.log('Passwords: %d', this.total);
    return this.total;
  }
}

const day4test1 = () => new PasswordHunt().run();
const day4test2 = () => new PasswordHunt(2).run();
module.exports = {
  PasswordHunt,
  day4test1,
  day4test2,
  day4runTests: () => {
    console.log("-- Day 4 test 1 --");
    day4test1();
    console.log("-- Day 4 test 2 --");
    day4test2();
  }
};
