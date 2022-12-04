const aocUtils = require('./aocUtils');
const _ = require('lodash')

function elfCalories(calories)
{
    const elves = [];
    let elfcs = 0;
    calories.split('\n').forEach(line => {
        if (_.isEmpty(line)) {
            elves.push(elfcs);
            elfcs = 0;
        } else {
            elfcs += Number(line);
        }
    });
    if (elfcs > 0) {
        elves.push(elfcs);
    }
    elves.sort((a,b) => b-a);
    console.log("Part 1: Greatest calories count = %d", elves[0]);
    console.log("# of elves: %d", elves.length);
    console.log("Part2: Top 3 elves: %d, %d, %d: Total = %d", elves[0], elves[1], elves[2], elves[0]+elves[1]+elves[2]);
}

function run(input_file = 'day1.txt') {
    const calories = aocUtils.getFile(input_file);
    elfCalories(calories);
}

module.exports = {
    run,
    test: () => run('day1_test.txt')
};



