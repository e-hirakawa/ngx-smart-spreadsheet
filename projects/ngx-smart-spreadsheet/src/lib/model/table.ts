import generateHeader from "../header-index-generator";
import generageId from "../id-generator";
import Cell from "./cell";

class Table {
    constructor(
        public id: string,
        public head: string[],
        public body: Cell[][]
    ) { }

    public static of(recordCount: number, fieldCount: number): Table {
        const row = Array(fieldCount).fill('');
        const tableId = generageId();
        const head = row.map((v, c) => generateHeader(c + 1));
        const body = [];
        for (let r = 0; r < recordCount; r++) {
            body.push(row.map((v, c) => new Cell(tableId, r, c, '')));
        }
        return new Table(tableId, head, body);
    }

    public findCell(row: number, col: number): Cell | null {
        for (const record of this.body) {
            for (const field of record) {
                if (field.row === row && field.col === col) {
                    return field;
                }
            }
        }
        return null;
    }

    public insertColumn(colIndex: number): void {
        {
            const remains = this.head.slice(0, colIndex);
            const updates = Array(this.head.length - colIndex + 1)
                .fill('')
                .map((v, c) => generateHeader((c + 1) + colIndex));
            this.head = [...remains, ...updates];
        }
        {
            const body = [];
            for (let r = 0; r < this.body.length; r++) {
                const row = this.body[r];
                const above = row.slice(0, colIndex);
                const present = new Cell(this.id, r, colIndex, '');
                const below = row.slice(colIndex).map(cell => cell.withCol(cell.col + 1));
                const newRow = [...above, present, ...below];
                body.push(newRow);
            }
            this.body = body;
        }
    }

    public deleteColumn(colIndex: number): void {
        {
            const remains = this.head.slice(0, colIndex);
            const updates = this.head.slice(colIndex + 1)
                .map((v, c) => generateHeader((c + 1) + colIndex));
            this.head = [...remains, ...updates];
        }
        {
            const body = [];
            for (let r = 0; r < this.body.length; r++) {
                const row = this.body[r];
                const above = row.slice(0, colIndex);
                const below = row.slice(colIndex + 1).map(cell => cell.withCol(cell.col + 1));
                const newRow = [...above, ...below];
                body.push(newRow);
            }
            this.body = body;
        }
    }

    public insertRow(rowIndex: number): void {
        const above = this.body.slice(0, rowIndex);
        const present = Array(this.colCount).fill('')
            .map((v, c) => new Cell(this.id, rowIndex, c, ''));
        const below = this.body.slice(rowIndex)
            .map((row) => row.map((cell) => cell.withRow(cell.row + 1)));
        this.body = [...above, present, ...below];
    }

    public deleteRow(rowIndex: number): void {
        const above = this.body.slice(0, rowIndex);
        const below = this.body.slice(rowIndex + 1)
            .map((row) => row.map((cell) => cell.withRow(cell.row + 1)));
        this.body = [...above, ...below];
    }

    public get rowCount(): number {
        return this.body.length;
    }

    public get colCount(): number {
        return this.head.length;
    }
}

export default Table;
