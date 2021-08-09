import { mergeDeep } from "./deep-marge";
import { SpreadsheetSettingOptions } from "./spreadsheet-settings-options";

const defaultOptions: SpreadsheetSettingOptions = {
    contextMenuRowLabel: {
        INSERT_ROW_ABOVE: 'Insert 1 row above',
        INSERT_ROW_BELOW: 'Insert 1 row below',
        DELETE_ROW: 'Delete row',
    },
    contextMenuColLabel: {
        INSERT_COLUMN_LEFT: 'Insert 1 column left',
        INSERT_COLUMN_RIGHT: 'Insert 1 column right',
        DELETE_COLUMN: 'Delete column',
    }
};

export class SpreadsheetSettings {
    constructor(
        public rows: number | null,
        public cols: number | null,
        public data: string[][] | null,
        public options?: SpreadsheetSettingOptions
    ) {
        this.options = mergeDeep(defaultOptions, options || {});
    }

    public static empty(rows: number, cols: number, options?: SpreadsheetSettingOptions): SpreadsheetSettings {
        return new SpreadsheetSettings(rows, cols, null, options);
    }

    public static load(data: string[][], options?: SpreadsheetSettingOptions): SpreadsheetSettings {
        return new SpreadsheetSettings(null, null, data, options);
    }
};
