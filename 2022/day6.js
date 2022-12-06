const fs = require('fs');

function firstUnique(line, s=4) {
    let c = {};
    for (let i = 0; i < line.length - s; i += 1) {
        const m = {};
        let unique = true;
        for (let j = i; j < i+s && unique; j++ ) {
            const c = line[j];
            if (!m[c]) m[c]=true;
            else
                unique=false;
        }
        if (unique) {
            console.log("Seg size %d: Unique at position %d - %d: %s", s, i, i+s,line.substring(i, i + s));
            break;
        }
    }
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



