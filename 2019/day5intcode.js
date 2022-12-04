const { csv2vals } = require('./aocUtils');
const ADD = 1;
const MUL = 2;
const READ = 3;
const WRITE = 4;
const JMPTRUE = 5;
const JMPFALSE = 6;
const LT = 7;
const EQ = 8;
const HLT = 99;

const MODE_POS = 0;
const MODE_LIT = 1; // "immediate"

class IntCode {

  constructor(input, inputFile = './day5.txt') {
    this.vals = csv2vals(inputFile);
    this.inputBus = input;
  }

  // i : a vals addr.
  makeOp(i) {
    const op = this.vals[i]; // number
    const code = op % 100;
    const parms = String(op).padStart(5,'0');
    return {
      c: code,
      m1: parseInt(parms[2]),
      m2: parseInt(parms[1]),
      m3: parseInt(parms[0]),
    };
  }

  storeVal(mode, param, res) {
    if (mode == MODE_POS) {
      this.vals[param] = res;
    } else if (mode == MODE_LIT) {
      throw new Error(`Attempt to store at immediate: res = ${res}`);
    } else {
      throw new Error(`Undefined: do something with ${res} => ${param}`);
    }
  };

  getVal(mode, param) {
    if (mode == MODE_POS) {
      return this.vals[param];
    } else if (mode == MODE_LIT) {
      return param;
    } else {
      throw new Error(`Invalid mode ${mode}`);
    }
  };

  run() {
    let i = 0;
    const vals = this.vals;
    while (i < vals.length) {
      const op = this.makeOp(i);
      if (op.c === ADD || op.c === MUL) {
        // add 1, mult 2
        const val1 = this.getVal(op.m1, vals[i+1]);
        const val2 = this.getVal(op.m2, vals[i+2]);
        const res = (op.c == ADD) ? val1 + val2 : val1 * val2;
        this.storeVal(op.m3, vals[i+3], res);
        i += 4;
      } else if (op.c === READ) {
        console.log("Read input (%d)", this.inputBus);
        this.storeVal(op.m1, vals[i+1], this.inputBus);
        i += 2;
      } else if (op.c === WRITE) {
        const outVal = this.getVal(op.m1, vals[i+1]);
        console.log("Write output: %d", outVal);
        i += 2;
      } else if (op.c === JMPTRUE || op.c === JMPFALSE) {
        const cond = this.getVal(op.m1, vals[i+1]);
        if ((op.c == JMPTRUE && cond != 0) || (op.c == JMPFALSE && cond == 0)) {
          i = this.getVal(op.m2, vals[i+2]);
        } else {
          i += 3;
        }
      } else if (op.c === LT || op.c === EQ) {
        // 7 is less than, 8 is ==
        const val1 = this.getVal(op.m1, vals[i+1]);
        const val2 = this.getVal(op.m2, vals[i+2]);
        const res = ((op.c == LT && val1 < val2) || (op.c == EQ && val1 == val2)) ? 1 : 0;
        this.storeVal(op.m3, vals[i+3], res);
        i += 4;
      } else if (op.c === HLT) {
        break;
      } else {
        throw new Error(`Invalid operator ${JSON.stringify(op)} at pos ${i}`);
        break;
      }
    }
    return true;
  }

  getAddress(i) { return this.vals[i] };
}

const day5test1 = () => new IntCode(1).run();
const day5test2 = () => new IntCode(5).run();

module.exports = {
  IntCode,
  day5test1,
  day5test2,
  day5runTests: () => {
    console.log('-- day5 test 1--');
    day5test1();
    console.log('--test 2--');
    day5test2();
  }
};
