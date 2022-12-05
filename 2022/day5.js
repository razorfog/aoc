const fs = require('fs');
const _ = require('lodash');

function processInput(inputFile) {
    const lines = fs.readFileSync(inputFile, 'utf8').split('\n');
    let stacks = [];
    let l = 0;
    for (; l < lines.length; l++) {
        const line = lines[l];
        if (line.startsWith(" 1")) break;
        let row = 0;
        for (let i = 0; i < line.length; i += 4)
        {
            row += 1;
            if (stacks.length < row)
                stacks.push([]);
            const box = line.substring(i, i + 3).trim();
            if (!box) continue;
            stacks[row - 1].unshift(box[1]);
        }
    }
    l += 2; // skip the 1 2 3 and blank line.
    const moves = [];
    const mre = /^move (\d+) from (\d+) to (\d+)/;
    for ( ; l < lines.length; l++) {
        const m = mre.exec(lines[l]);
        if (!m) break;
        moves.push({items:Number(m[1]), from:Number(m[2]), to:Number(m[3])});
    }
    return {
        stacks,
        moves
    };
}

function rearrange({stacks, moves}) {
    const stacks_p2 = _.cloneDeep(stacks);
    moves.forEach(move => {
        for (let i = 0; i < move.items; i++) {
            stacks[move.to-1].push(stacks[move.from-1].pop());
        }
        // part2
        const from_stack = stacks_p2[move.from-1];
        const moved = from_stack.slice(from_stack.length - move.items);
        from_stack.length = from_stack.length - move.items;
        stacks_p2[move.to-1].push(...moved);
    });
    let res = '';
    // stacks.forEach((s,i) => console.log("Row %d: %s", i+1, s));
    stacks.forEach(s => res += s[s.length-1]);
    console.log("Part1: %s", res);
    // stacks_p2.forEach((s,i) => console.log("Part 2 Row %d: %s", i+1, s));
    res = '';
    stacks_p2.forEach(s => res += s[s.length-1]);
    console.log("Part1: %s", res);
}

function run(input_file = 'day5.txt') {
    rearrange(processInput(input_file))
}

//run('day5_test.txt');
//run();

module.exports = {
    test: () => run('day5_test.txt'),
    run,
};



