const aocUtils = require('./aocUtils');

const sample = [
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263,
];

function increases(readings, testname = "1.a") {
    let increases = 0;
    for (let i =1; i < readings.length; i++) {
        if (readings[i] > readings[i-1]) {
            increases += 1;
        }
    }
    console.log("%s increases: %d", testname, increases);
}

function trimeasures(readings) {
    let tris = [];
    for (let i = 2; i < readings.length; i++) {
        tris.push(readings[i-2] + readings[i-1] + readings[i]);
    }
    increases(tris, "1.b");
}

function run(input_file) {
    const readings = aocUtils.fileToIntVals(input_file);
    increases(readings);
    trimeasures(readings);
}

module.exports = {
    run,
    increases, trimeasures
};



