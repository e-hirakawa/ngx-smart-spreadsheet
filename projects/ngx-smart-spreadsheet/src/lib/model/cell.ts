
class Cell {
    public id: string;
    constructor(
        public tableId: string,
        public row: number,
        public col: number,
        public value: string,
        public editable: boolean = false
    ) {
        this.id = `${tableId}-${row}-${col}`;
    }

    public withRow(index: number): Cell {
        return new Cell(this.tableId, index, this.col, this.value, this.editable);
    }

    public withCol(index: number): Cell {
        return new Cell(this.tableId, this.row, index, this.value, this.editable);
    }
}

export default Cell;
