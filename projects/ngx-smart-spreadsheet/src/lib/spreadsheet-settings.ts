class SpreadsheetSettings {
    constructor(
        public rows: number | null,
        public cols: number | null,
        public data: string[][] | null
    ) { }

    public static empty(rows: number, cols: number): SpreadsheetSettings {
        return new SpreadsheetSettings(rows, cols, null);
    }

    public static load(data: string[][]): SpreadsheetSettings {
        return new SpreadsheetSettings(null, null, data);
    }
};

export default SpreadsheetSettings;
