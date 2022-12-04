const aocUtils = require('./aocUtils');
const _ = require('lodash');

function getCounts(bins) {
    const bitcount = bins[0].split('').map(x => ({"1":0, "0": 0}));
    bins.forEach(bx => {
        bx.split('').forEach((b,i) => {
            bitcount[i][b] += 1;
        });
    });
    return bitcount;    
}

function diagrep(bins) {
    const bitcount = getCounts(bins);
    let gamma = bitcount.map(p => p['0'] > p['1'] ? '0' : '1');
    let epsi = gamma.map(b => b == '1' ? '0' : 1);
    
    gamma = parseInt(gamma.join(''), 2);
    epsi = parseInt(epsi.join(''), 2);
    console.log("gamma: %d. epsillon: %d: answer = %d", gamma, epsi, gamma * epsi);
}

function scrubber(bins) {
    let co2 = _.clone(bins);
    let o2 = _.clone(bins);
    for (let i = 0; i < bins[0].length; i++) {
        if (o2.length > 1) {
            const o2counts = getCounts(o2);
            const vals = o2counts[i];
            o2 = o2.filter(num => (vals['0'] > vals['1'] && num[i] == '0') ||
                (vals['0'] <= vals['1'] && num[i] == '1'));
            //console.log("pass %d: vals %s: o2: %s",i+1, JSON.stringify(vals), JSON.stringify(o2));
        }
        if (co2.length > 1) {
            const co2counts = getCounts(co2);
            const vals = co2counts[i];
            co2 = co2.filter(num => (vals['0'] > vals['1'] && num[i] == '1') ||
                (vals['0'] <= vals['1'] && num[i] == '0'));
        }
    }
    const co2x = parseInt(co2[0],2);
    const o2x = parseInt(o2[0], 2);
    console.log("co2: %s.  = %d", JSON.stringify(co2), co2x);
    console.log("o2: %s.   = %d", JSON.stringify(o2), o2x);
    console.log("Answer: %d", o2x * co2x);
}

// const sample = aocUtils.getInput('./day3.sample');
//diagrep(sample);
//scrubber(sample);

function run(input_file) {
    const stuff = aocUtils.getInput(input_file);
    diagrep(stuff);
    scrubber(stuff);
}

module.exports = {
    run,
    diagrep
};



