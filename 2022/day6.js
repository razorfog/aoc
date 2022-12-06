const fs = require('fs');

function firstUnique(line, s=4) {
    let c = {};
    for (let i = 0; i < line.length - s; i += 1) {
        const m = {};
        const section = new Set(line.slice(i, i+s));
        if (section.size == s) {
            console.log("Sig size: %d Unique at index %d: %s", s, i+s, line.slice(i, i+s));
            return;
        }
    }
    console.log("No luck. Didint' find it.");
}
function run(input_file = 'day6.txt') {
    const lines = fs.readFileSync(input_file, 'utf8').split('\n');
    firstUnique(lines[0]);
    firstUnique(lines[0], 14);
}

module.exports = {
    test: () => run('day6_test.txt'),
    run,
};



