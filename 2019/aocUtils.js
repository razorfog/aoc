const _ = require('lodash');
const fs = require('fs');

function getInput(filename) {
  return fs.readFileSync(filename, 'utf8').split('\n').filter(s => !_.isEmpty(s));
}

function csv2vals(filename) {
  const lines = getInput(filename);
  var vals = [];
  lines.forEach(l => {
    const v = l.split(',').filter(s => !_.isEmpty(s)).map(l => Number(l));
    vals = vals.concat(v);
  });
  console.log("Total values:", vals.length);
  return vals;
}

function fileToIntVals(filename) {
  const values = getInput(filename)
    .map(s => Number(s));
  console.log("Values.length =>", values.length);
  return  values;
}

// cheating help for when testing with the repl
// requires in REPL this command: var a = require('./index')
function xl() {
  const reloads = ['./index', './aocUtils', './day5intcode'];
  reloads.forEach(f => delete require.cache[require.resolve(f)]);
  reloads.forEach(f => require(f));
  a = require('./index');
  return true;
}

module.exports = {
  xl,
  csv2vals,
  getInput,
};
