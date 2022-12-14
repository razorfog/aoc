const fs = require('fs');
const _ = require('lodash');

function run(inputFile = 'day11.txt') {
  const data = fs.readFileSync(inputFile, 'utf8').trimEnd()
    .split('\n');

  const monkey = /^Monkey (\d+).*$/;
  const start = /^ {2}Starting items: (.+)$/;
  const oper = /^ {2}Operation: new = old (.) (\w+).*$/;
  const testx = /^ {2}Test: divisible by (\d+)/;
  const ifTF = /^ {4}If (\w+): throw to monkey (\d+)/;
  const parsers = [monkey, start, oper, testx, ifTF, ifTF];

  let mline = 0;
  const Monkeys = [];
  let thisMonkey = {inspected: 0};

  data.forEach(line => {
    line = line.trimEnd();
    if (!line || mline >= parsers.length) {
      mline = 0;
      thisMonkey = {inspected: 0};
      return;
    }
    const m = parsers[mline].exec(line);
    switch (mline) {
      case 0:
        thisMonkey.monkey = Number(m[1]);
        break;
      case 1:
        thisMonkey.items = m[1].split(',').map(Number);
        break;
      case 2:
        thisMonkey.op = m[1];
        thisMonkey.val = m[2] != 'old' ? Number(m[2]) : 'old';
        break;
      case 3:
        thisMonkey.divby = Number(m[1]);
        break;
      case 4:
      case 5:
        const ifx = `if${m[1]}`;
        thisMonkey[ifx] = Number(m[2]);
        if (mline === 5)
          Monkeys.push(thisMonkey);
        break;
    }
    mline += 1;
  });

  // calc the modulo (would have never known this)
  const modulo = Monkeys.reduce((a,b) => a * b.divby, 1);
  console.log("Modulo is: %s", modulo);

  function partie(WorryDiv, Signes, maxRounds = 20, p = 1) { // francais for monkey
    function throwToMonkey(m, item, from) {
      Signes[m].items.push(item);
    }

    function printRound(r) {
      console.log('== After round %d ==', r+1);
      for (m of Signes) {
        console.log("Monkey %d inspected items %d times", m.monkey, m.inspected);;
      }
      console.log('');
    }

    function newVal(op, item, val) {
      const xval = val === 'old' ? item : val;
      let res = op === '+' ?  item + xval : item * xval;
      return res % modulo;
    }

    const debugr = [];
    for (let round = 0; round < maxRounds; round++) {
      for (let m = 0; m < Signes.length; m += 1) {
        let {items, op, val, divby, iftrue, iffalse} = Signes[m];
        while (items.length > 0) {
          Signes[m].inspected += 1;
          const item = items.shift();
          let targetVal = newVal(op, item, val);
          if (WorryDiv > 1)
            targetVal = Math.floor(targetVal / WorryDiv);
          throwToMonkey(targetVal % divby === 0 ? iftrue : iffalse, targetVal, m);
        }
      }
      if (debugr.findIndex(z => z === round) >= 0) printRound(round);
    }
    Signes.sort((a, b) => b.inspected - a.inspected);
    for (m of Signes) {
      console.log("Monkey %d inspected items %d times", m.monkey, m.inspected);
    }
    console.log("Part %d: Monkey business = %d", p, Signes[0].inspected * Signes[1].inspected);
  }

  partie(3, _.cloneDeep(Monkeys));
  partie(1, _.cloneDeep(Monkeys), 10000, 2);
}

module.exports = {
  test: () => run('day11_test.txt'),
  run,
};
