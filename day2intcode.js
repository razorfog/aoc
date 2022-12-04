// determine pair of inputs that produces 19690720
const { csv2vals } = require('./aocUtils');

function whichPair(filename = './day2ic.txt', magic = 19690720 ) {
  const vals = csv2vals(filename);

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const resx = intcode('', noun, verb, [...vals]);
      if (resx == magic) {
        console.log('noun = %d. verb = %d', noun, verb);
        return 100 * noun + verb;
      }
    }
  }
  console.log("Rats. Didn't find it");
  return 0;
}

function intcode(filename = './day2ic.txt', noun = 12, verb = 2, xvals = null) {
  const vals = xvals == null ? csv2vals(filename) : xvals;
  vals[1] = noun;
  vals[2] = verb;
  let i = 0;
  while (vals[i] != 99) {
    const op = vals[i];
    const val1 = vals[vals[i+1]];
    const val2 = vals[vals[i+2]];
    const res = (op == 1) ? val1 + val2 : val1 * val2;
    vals[vals[i+3]] = res;
    i += 4;
  }
  return vals[0];
}

const day2test1 = () => {
  console.log(' --- Day 2 Test 1 ---');
  console.log('Result: %d', intcode());
}

const day2test2 = () => {
  console.log(' --- Day 2 Test 2 ---');
  console.log('Pair value: %d', whichPair());
}

module.exports = {
  intcode,
  whichPair,
  day2test1,
  day2test2,
  day2runTests: () => {
    day2test1();
    day2test2();
  }
};
