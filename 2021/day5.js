const aocUtils = require('./aocUtils');

function getGraph(filename) {
    let X = 0, Y = 0;
    const grid = {};
    grid.lines = aocUtils.getInput(filename)
        .map(line => {
            const points = line.split("->");
            if (points.length != 2) {
                return null
            }
            return points.map(p => {
                const xy = p.trim().split(',').map(i => Number(i));
                if (xy[0] > X) {
                    X = xy[0];
                }
                if (xy[1] > Y) {
                    Y = xy[1];
                }
                return {x: xy[0], y: xy[1]}
            });
        });
    grid.grid = Array(Y+1).fill(0).map(z => Array(X+1).fill(z));
    return grid;
    
}

function countCollisions(grid) {
    let total = 0;
    grid.forEach(row => row.forEach(x => {if (x > 1) total += 1;}));
    return total;
}

function writeLine(line, grid) {
    let {x:x1, y:y1} = line[0];
    const {x:x2, y:y2} = line[1];
    const run = x2 - x1;
    const rise = y2 - y1;
    const xp = run > 0 ? 1 : run < 0 ? -1 : 0;
    const yp = rise > 0 ? 1 : rise < 0 ? -1 : 0;
    // console.log("RISE: %d. RUN: %d", rise, run);
    if (x1 != x2 || y1 != y2) {
        // console.log("POINT: y: %d x:%d",y2,x2);
        grid[y2][x2] += 1;
    }
    do {
        grid[y1][x1] += 1;
        y1 += yp;
        x1 += xp;
    } while (x1 != x2 || y1 != y2);

}
function moose(grid) {
//    console.log("GRID lines:");
    grid.lines.forEach(xy => {
//        console.log("{%d,%d} => {%d,%d}", xy[0].x,xy[0].y, xy[1].x, xy[1].y);
        writeLine(xy, grid.grid);
    });
//    const straigts = grid.lines.filter(xy => xy[0].x == xy[1].x || xy[0].y == xy[1].y);
//    console.log("Straight lines:");
//    straigts.forEach(xy => {
//        console.log("{%d,%d} => {%d,%d}", xy[0].x,xy[0].y,xy[1].x, xy[1].y );
//        writeLine(xy, grid.grid);
//    });
    
//    console.log("THE GRID:");
//    grid.grid.forEach(row => {
//        const l = row.map(x => x === 0 ? "." : x.toString());
//        console.log(l.join(''));
//    });
    console.log("TOTAL COLLISIONS: %d", countCollisions(grid.grid));
}

function run(filename) {
    const grid = getGraph(filename);
    moose(grid);
}

// run("./day5.sample");
module.exports = {
    run
}
