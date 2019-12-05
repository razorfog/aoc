'use strict';
const _ = require('lodash');
const aocUtils = require('./aocUtils');
const day5 = require('./day5intcode');
const day4 = require('./day4passwd');

module.exports = _.assign(aocUtils, day4, day5);

const allTests = _.pick(module.exports, _.keys(module.exports).filter(k => k.endsWith('runTests')));

module.exports.runAllTests = () => {
  _.keys(allTests).forEach(t => allTests[t]());
}
