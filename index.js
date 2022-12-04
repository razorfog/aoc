'use strict';
const _ = require('lodash');
const fs = require('fs');
const aocUtils = require('./aocUtils');

module.exports = aocUtils;
const fileRe = /day[0-9]+.*\.js$/;
fs.readdirSync(__dirname)
  .filter(f => fileRe.test(f))
  .forEach(f => _.assign(module.exports, require(__dirname + '/' + f)));

const allTests = _.pick(module.exports, _.keys(module.exports).filter(k => k.endsWith('runTests')));

module.exports.runAllTests = () => {
  _.keys(allTests).forEach(t => allTests[t]());
};
