const aocUtils = require('./aocUtils');
const util = require('util');

function goDay(dayset) {
    const newset = Array(9).fill(0);
    dayset.forEach((c,d) => {
        if (c === 0) {
            return;
        }
        if (d == 0) {
            newset[8] = c;
            newset[6] = c;
        } else {
            newset[d-1] += c;
        }
    });
    return newset;
}

function run(filename) {
    let data = aocUtils.csv2vals(filename)[0].map(n => Number(n));
    let dayset = Array(9).fill(0);
    data.forEach(d => {
        dayset[d] += 1;
    });
    
    for (let d = 1; d <= 256; d++) {
        dayset = goDay(dayset);
    }
    let t = dayset.reduce((a,b) => a+b,0);
    console.log("Set total:", t);

}
// run('./day6.sample');

module.exports = {
    run
};