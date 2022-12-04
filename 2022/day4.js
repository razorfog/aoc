const fs = require('fs');

function processInput(inputFile) {
    return fs.readFileSync(inputFile, 'utf8')
        .split('\n').filter(Boolean).map(l => l.split(','))
        .map(line => line.map(x => x.split('-').map(Number)));
}

function findOverlaps(pairs)
{
    let total = 0;
    let partials = 0;
    pairs.forEach(([[s1, e1], [s2, e2]]) => {
        if ((s1 <= s2 && e1 >= e2) || (s2 <= s1 && e2 >= e1)) {
            total += 1;
            partials += 1;
        } else if (e2 >= s1 && e1 >= s2)
            partials += 1;
    });
    console.log("part1: Total = %d", total);
    console.log("part2: Total = %d", partials);
}
function run(input_file = 'day4.txt') {
    findOverlaps(processInput(input_file));
}

// run('day4_test.txt');
// run('')

module.exports = {
    test: () => run('day4_test.txt'),
    run,
};



