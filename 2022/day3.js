const aocUtils = require('./aocUtils');
const _ = require('lodash');

function itemValue(c) {
    if (c >= 'a' && c <= 'z') {
        return 1 + c.charCodeAt(0) - 'a'.charCodeAt(0);
    }
    // A-Z
    return 27 + c.charCodeAt(0) - 'A'.charCodeAt(0);
}

function findElfGroups(input_file) {
    const stuff = aocUtils.getInput(input_file, ' ');
    let itemMap = {};
    let total = 0;
    stuff.forEach((line, i) => {
        const gi = i % 3;
        line.split('').forEach(c => {
            if (gi == 0) itemMap[c] = 1;
            else if (gi == 1 && itemMap[c]) itemMap[c] = 2;
            else if (itemMap[c] == 2) itemMap[c] = 3;
        });
        if (gi == 2) {
            _.forEach(itemMap, (v,f) => {
                if (v == 3) {
                  total += itemValue(f);
                }
            });
            itemMap = {};
        }
    });
    console.log("Part2: Group values: %d", total);
}
function rucksackInventory(input_file)
{
    const stuff = aocUtils.getInput(input_file, ' ');
    let total = 0;
    stuff.forEach(line => {
        const half = line.length>>1;
        if (half + half != line.length) {
            console.log("ODD %s", line);
        }
        const r1 = line.substring(0,half);
        const r2 = line.substring(half);
        const itemMap = {};
        r1.split('').forEach(c => itemMap[c] = 1);
        const inBoth = {};
        r2.split('').forEach(c => {
            if (itemMap[c] == 1 && !inBoth[c]) {
                inBoth[c] = 1;
                total += itemValue(c);
            }
        });
    });
    console.log("P1 Total: %d", total);
}

function run(input_file = 'day3.txt') {
    rucksackInventory(input_file);
    findElfGroups(input_file);
}

module.exports = {
    test: () => run('day3_test.txt'),
    run,
};



