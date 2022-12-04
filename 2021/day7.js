const { csv2vals } = require('./aocUtils');

function sumn(delta) {
    return (delta * (delta + 1)) / 2;
}

function run(filename) {
    const data = csv2vals(filename)[0].map(n => Number(n));
    data.sort((a,b) => a-b);
    const ave = data.reduce((a,b) => a+b) / data.length;
    const ave_best = Math.round(ave);
    const ave_best2 = Math.floor(ave);
    console.log("Ave (len=%d) => %d. Best ave = %d.", data.length, ave, ave_best);
//    console.log("SORTED DATA:", data);
    const mid = data.length >> 1;
    const med = data.length&1 == 0 ? (data[mid-1] + data[mid])/2 : data[mid];
    console.log("MEDIAN: med val: %d. mid pos = %d. data[pos] = %d", med, mid, data[mid]);

    let xf = 0;
    let xf2 = 0;
    const fuel = data.reduce((a,b) => {
        const f = Math.abs(b-med);
        xf += sumn(Math.abs(b-ave_best));
        xf2 += sumn(Math.abs(b-ave_best2));
        a += f;
//        console.log("total: %d. %d to %d: %d fuel", a, b, med, f);
        return a;
    }, data[0]);
    console.log("Total fuel:", fuel);
    console.log("Pt 2 fuel:", xf);
    console.log("Pt 2 fuel v2:", xf2);
}

run('./day7.input');

module.exports = {
    run
};

