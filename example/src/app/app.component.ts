import { Component } from '@angular/core';
import { SpreadsheetSettings } from 'ngx-smart-spreadsheet';

@Component({
  selector: 'app-root',
  template: `
  <div class="gh"></div>
  <h1>
    <img src="favicon.ico" alt="" />
    Lightweight spreadsheet for Angular
  </h1>
  <div class="info">
    <a href="https://www.npmjs.com/package/ngx-smart-spreadsheet">
      <img src="https://img.shields.io/npm/v/ngx-smart-spreadsheet.svg" alt="npm version" />
    </a>
    <a href="https://github.com/e-hirakawa/ngx-smart-spreadsheet/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/e-hirakawa/ngx-smart-spreadsheet.svg" alt="license" />
    </a>
    <a href="https://github.com/e-hirakawa/ngx-smart-spreadsheet">
      <img src="https://img.shields.io/bundlephobia/min/ngx-smart-spreadsheet.svg" alt="minified size" />
    </a>
    <a href="https://www.npmjs.com/package/ngx-smart-spreadsheet">
      <img src="https://img.shields.io/npm/dt/ngx-smart-spreadsheet.svg" alt="downloads" />
    </a>
  </div>
  <hr />
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
    'h1 { color: #666; display: inline-flex; align-items: center;}',
    'h1 > img { opacity: 0.6; margin-right: 10px; }',
    '.info { display: flex; gap: 10px; }',
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
