import { Component } from '@angular/core';
import { SpreadsheetSettings } from 'ngx-smart-spreadsheet';

@Component({
  selector: 'app-root',
  template: `
  <h1>Lightweight spreadsheet for Angular</h1>
  <div class="settings">
    <label>Rows
      <input #inputRows type="number" [min]="MIN_VALUE" [max]="MAX_VALUE" [value]="DEFAULT_VALUE" />
    </label>
    <label>Cols
    <input #inputCols type="number" [min]="MIN_VALUE" [max]="MAX_VALUE" [value]="DEFAULT_VALUE" />
    </label>
    <button (click)="createEmpty(inputRows.value, inputCols.value)">Create empty table</button>
    <div class="divider"></div>
    <button (click)="createDummy()">Create dummy table</button>
    <div class="divider"></div>
    <button (click)="reset()">Reset</button>
  </div>
  <ng-container *ngIf="settings">
    <ngx-smart-spreadsheet [settings]="settings"></ngx-smart-spreadsheet>
  </ng-container>
  `,
  styles: [
    '.settings { display: flex; gap: 1em; margin: 1em; }',
    'input { min-width: 8em; }',
    '.divider { border-left: 1px solid #ddd; margin-left: 0.5em; padding-right: 0.5em; }'
  ]
})
export class AppComponent {
  readonly MIN_VALUE = 1;
  readonly MAX_VALUE = 999;
  readonly DEFAULT_VALUE = 5;

  settings: SpreadsheetSettings | null = null;

  constructor() {
    this.createDummy();
  }

  createEmpty(rowsValue: string, colsValue: string): void {
    const rows = this.parse(rowsValue);
    const cols = this.parse(colsValue);
    this.settings = SpreadsheetSettings.empty(rows, cols);
  }

  createDummy(): void {
    const category = ['Bag', 'Hat', 'Footwear', 'Wallet', 'Kitchen', 'Outdoor']
    const status = ['Draft', 'Review', 'Approve', 'Reject', 'Discard']
    const dummy = [['Product ID', 'Product Category', 'Status', 'Price', 'Date']];
    for (let i = 0; i < 15; i++) {
      dummy.push([
        `PID${i}`,
        category[this.random(category.length)],
        status[this.random(status.length)],
        `${this.random(10000)}`,
        new Date().toLocaleString()
      ]);
    }
    this.settings = SpreadsheetSettings.load(dummy);
  }

  reset(): void {
    this.settings = null;
  }

  private parse(value: string): number {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < this.MIN_VALUE || num > this.MAX_VALUE) {
      return this.DEFAULT_VALUE;
    }
    return num;
  }

  private random(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
