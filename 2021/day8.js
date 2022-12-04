
class SevenSeg {
    constructor() {
        this.display = Array(7).fill(Array(6).fill(' '));
        this.A = {c: 'a', p: [[0, 1], [0, 4]]};
        this.B = {c: 'b', p: [[1, 0], [2, 0]]};
        this.C = {c: 'c', p: [[1, 5], [2, 5]]};
        this.D = {c: 'd', p: [[3, 1], [3, 4]]};
        this.E = {c: 'e', p: [[4, 0], [5, 0]]};
        this.F = {c: 'f', p: [[4, 5], [5, 5]]};
        this.G = {c: 'g', p: [[6, 1], [6, 5]]};
        this.segments = [this.A, this.B, this.C, this.D, this.E, this.F, this.G];
    }
    
    render(seg, on=true) {
        let [[y1,x1], [y2,x2]] = seg.p;
        const c = on ? seg.c : ' ';
        while (y1 != y2 || x1 != x2) {
            this.display[y1][x1] = c;
            if (y1 < y2) {
                y1 += 1;
            }
            if (x1 < x2) {
                x1 += 1;
            }
        }
    }
    
    print() {
        this.display.forEach(row => {
            console.log(row.join(''));
        });
    }
    
    
}