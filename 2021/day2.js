const aocUtils = require('./aocUtils');

const sample = [
    "forward 5",
    "down 5",
    "forward 8",
    "up 3",
    "down 8",
    "forward 2"
];
const moose = sample.map(l => l.split(/\s+/));

function aim(moves) {
    const pos = {
        horizontal: 0,
        depth: 0,
        aim:0,
    };
    moves.forEach(l => {
        const dir = l[0];
        const val = l[1];
        const x = Number(val);
        if (dir == "forward") {
            pos.horizontal += x;
            if (pos.aim != 0) {
                pos.depth += x * pos.aim;
            }
        } else if (dir == "down") {
            pos.aim += x;
        } else if (dir == "up") {
            pos.aim -= x;
        } else {
            console.log("Invalid direction: %s, %d", dir, val);
        }
    });
    console.log("aim=%d horiz=%d, depth=%d 1.a answer: %d", pos.aim, pos.horizontal, pos.depth, pos.horizontal * pos.depth);
}
// aim(moose);

function navigate(moves) {
    const pos = {
        horizontal: 0,
        depth: 0,
    };
    moves.forEach(l => {
        const dir = l[0];
        const val = l[1];
        const x = Number(val);
        if (dir == "forward") {
            pos.horizontal += x;
        } else if (dir == "down") {
            pos.depth += x;
        } else if (dir == "up") {
            pos.depth -= x;
        } else {
            console.log("Invalid direction: %s, %d", dir, val);
        }
    });
    console.log("horiz=%d, depth=%d 1.a answer: %d", pos.horizontal, pos.depth, pos.horizontal * pos.depth);
    
}

function run(input_file) {
    const readings = aocUtils.csv2vals(input_file, /\s+/);
    navigate(readings);
    aim(readings);
}

module.exports = {
    run,
    navigate
};



