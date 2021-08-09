import Anchor from "./anchor";

class Range {
    constructor(
        public r1: number,
        public c1: number,
        public r2: number,
        public c2: number
    ) { }

    public calc(row: number, col: number): void {
        if (row < this.r1) {
            this.r1 = row;
        }
        if (row > this.r2) {
            this.r2 = row;
        }
        if (col < this.c1) {
            this.c1 = col;
        }
        if (col > this.c2) {
            this.c2 = col;
        }
    }

    public includes(row: number, col: number): boolean {
        return (row >= this.r1 && row <= this.r2)
            && (col >= this.c1 && col <= this.c2);
    }

    public equals(range: Range) {
        return this.r1 === range.r1 && this.c1 === range.c1 && this.r2 === range.r2 && this.c2 === range.c2;
    }

    public static of(row: number, col: number, row2: number = row, col2: number = col): Range {
        return new Range(row, col, row2, col2);
    }

    public static marge(a1: Anchor, a2: Anchor): Range {
        const r1 = a1.r < a2.r ? a1.r : a2.r;
        const r2 = a1.r > a2.r ? a1.r : a2.r;
        const c1 = a1.c < a2.c ? a1.c : a2.c;
        const c2 = a1.c > a2.c ? a1.c : a2.c;
        return new Range(r1, c1, r2, c2);
    }
}

export default Range;
