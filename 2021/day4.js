// bingo
const aocUtils = require("./aocUtils");

function getBingoData(fname) {
    const bingoStuff = aocUtils.getFile(fname).split('\n');
 
    const order = bingoStuff[0].split(',').map(n => Number(n));
    const cards = [];
    
    for (let i = 2; i < bingoStuff.length && bingoStuff[i].trim() != ''; i+=6) {
        const card = [];
        for (j = 0; j < 5; j++) {
            const line = bingoStuff[i+j].trim().split(/\s+/).map(n => ({val: Number(n), played: false}));
            card.push(line);
        }
        cards.push({winner: false, box: card});
    }
    return {order, cards};
}

// const bingo = getBingoData("day4.sample");

function play(card, n) {
    if (card.winner) {
        return;
    }
    const box = card.box;
    let found = false;
    let row, col;
    for (row = 0; row < box.length; row++) {
        if (box[row].length != 5) {
            console.log("BAD ROW %d - len = %d: %s", row, card[row].length, JSON.stringify(card[row]));
        }
        for (col = 0; col < box[row].length; col++) {
            if (box[row][col].val === n) {
                found = true;
                box[row][col].played = true;
                break;
            }
        }
        if (found) {
            break;
        }
    }
    if (!found) {
        return false;
    }
    // check if this is a winner row
    let winner = true
    for (let x = 0; winner && x < box[row].length; x++) {
        winner = box[row][x].played;
    }
    if (winner) {
        return winner;
    }
    // check column
    winner = true;
    for (let r = 0; winner && r < box.length; r++) {
        winner = box[r][col].played;
    }
    return winner;
}

function sumUnMarked(card) {
    let sum = 0;
    card.box.forEach(r => r.forEach(c => {
        if (!c.played) sum += c.val;
    }));
    return sum;
}

function playBingo(bingo) {
    // let winner = false;
    let winCount = 0;
    for (let p = 0; p < bingo.order.length; p++) {
        const n = bingo.order[p];
        for (let c = 0; c < bingo.cards.length; c++) {
            if (play(bingo.cards[c], n)) {
                winCount += 1;
                console.log("WINNER #%d: Card %d - last play %d:", winCount, c, n);
                // console.log(JSON.stringify(bingo.cards[c]));
                const sumx = sumUnMarked(bingo.cards[c]);
                console.log("Winner sum: %d", sumx);
                console.log("%d x %d = final: %d", sumx, n, sumx * n);
                bingo.cards[c].winner = true;
                // break;
            }
        }
    }
}

// playBingo(bingo);

function run(filename) {
    const bingo = getBingoData(filename);
    playBingo(bingo);
}

module.exports = {
    run
}