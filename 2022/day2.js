const aocUtils = require('./aocUtils');
const _ = require('lodash')

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const LOSE = ROCK;
const DRAW = PAPER;
const WIN = SCISSORS;

function choosePlay(elf, wld)
{
    switch(wld) {
        case LOSE: return elf == ROCK ? SCISSORS : elf -1;
        case DRAW: return elf;
        case WIN: return elf == SCISSORS ? ROCK : elf + 1;
    }
}
// scores me. returns 3 if tie, return 0 if me loses
// returns 6 if me wins.
function winner(elf, me)
{
    return elf ==  me ? 3 :
        me == SCISSORS && elf == ROCK ? 0 :
        me == ROCK && elf == SCISSORS ? 6 :
        me > elf ? 6 : 0;
}

function playRPS(input_file)
{
    const guide = aocUtils.csv2vals(input_file, ' ');
    const rpsMap = {
        A: ROCK,
        B: PAPER,
        C: SCISSORS,
        X: ROCK,
        Y: PAPER,
        Z: SCISSORS
    };
    let score = 0;
    let scoreP2 = 0;
    guide.forEach(round => {
        const [elf, me] = round.map(c => rpsMap[c]);
        score += me;
        score += winner(elf, me);
        const me2 = choosePlay(elf, me);
        scoreP2 += me2;
        scoreP2 += winner(elf, me2);
    });
    console.log('p1: Total score: %d', score);
    console.log('p2: Total score: %d', scoreP2);
}

function run(input_file = 'day2.txt') {
    playRPS(input_file);
}

module.exports = {
    test: () => run('day2_test.txt'),
    run,
};



