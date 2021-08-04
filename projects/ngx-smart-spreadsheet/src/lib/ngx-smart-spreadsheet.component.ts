import { Component, Input, OnInit } from '@angular/core';
import generateHeader from './header-index-generator';
import generageId from './id-generator';

class Cell {
  public id: string;
  public value: string;
  constructor(
    public tableId: string,
    public row: number,
    public col: number,
    public defaultValue: string
  ) {
    this.id = `${tableId}-${row}-${col}`;
    this.value = '';
  }
}

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
      const dummy = r + '-';
      body.push(row.map((v, c) => new Cell(tableId, r, c, dummy)));
    }
    return new Table(tableId, head, body);
  }
}

@Component({
  selector: 'ngx-smart-spreadsheet',
  templateUrl: './ngx-smart-spreadsheet.component.html',
  styleUrls: ['./ngx-smart-spreadsheet.component.scss']
})
export class NgxSmartSpreadsheetComponent implements OnInit {
  @Input()
  recordCount = 30;
  @Input()
  fieldCount = 30;

  table!: Table;
  selectedCell: Cell | null = null;

  constructor() { }

  ngOnInit(): void {
    this.table = Table.of(this.recordCount, this.fieldCount);
  }

  setFocus(event: MouseEvent, target: Cell): void {
    console.log('setFocus', event, target);
    if (this.selectedCell !== target) {
      this.selectedCell = target;
      const td = event.target as HTMLTableDataCellElement;
      td.focus();
    } else if (this.selectedCell) {
    }
  }

  setEditable(event: MouseEvent, target: Cell): void {
    const td = event.target as HTMLTableCellElement;
    console.log('setEditable td.contentEditable', td.contentEditable, target, this.selectedCell);
    if (target === this.selectedCell) {
      if (td.contentEditable !== 'true') {
        td.contentEditable = 'true';
      }
    }
  }

  setValue(event: any, target: Cell): void {
    // const value = (event.target as HTMLTableCellElement).textContent || '';
    // target.value = value;
    console.log('setValue', event);
  }

  move(row: number, col: number): void {
    const { body } = this.table;
    if (row < body.length) {
      const cols = body[row];
      if (col < cols.length) {
        const cell = cols[col];
        // this.setFocus(null, cell);
      }
    }
  }

  //   initializeData(): string[][] {
  //     const data = [];
  //     for (let i = 0; i <= this.recordCount; i++) {
  //       const child = [];
  //       for (let j = 0; j <= this.fieldCount; j++) {
  //         child.push('');
  //       }
  //       data.push(child);
  //     }
  //     return data;
  //   };

  //   getData(): string[][] {
  //     let data = sessionStorage.getItem(STORAGE_KEY);
  //     if (data === undefined || data === null) {
  //       return this.initializeData();
  //     }
  //     return JSON.parse(data);
  //   };

  //   saveData(data: string[][]): void {
  //     sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  //   };

  //   resetData(): void {
  //     sessionStorage.removeItem(STORAGE_KEY);
  //     this.createSpreadsheet();
  //   };

  //   createHeaderRow = () => {
  //     const tr = document.createElement('tr');
  //     tr.setAttribute('id', 'h-0');
  //     for (let i = 0; i <= this.fieldCount; i++) {
  //       const th = document.createElement('th');
  //       th.setAttribute('id', `h-0-${i}`);
  //       th.setAttribute('class', `${i === 0 ? '' : 'column-header'}`);
  //       // th.innerHTML = i === 0 ? `` : `Col ${i}`;
  //       if (i !== 0) {
  //         const span = document.createElement('span');
  //         span.innerHTML = `Col ${i}`;
  //         span.setAttribute('class', 'column-header-span');
  //         const dropDownDiv = document.createElement('div');
  //         dropDownDiv.setAttribute('class', 'dropdown');
  //         dropDownDiv.innerHTML = `<button class='dropbtn' id='col-dropbtn-${i}'>+</button>
  //           <div id='col-dropdown-${i}' class='dropdown-content'>
  //             <p class='col-insert-left'>Insert 1 column left</p>
  //             <p class='col-insert-right'>Insert 1 column right</p>
  //             <p class='col-delete'>Delete column</p>
  //           </div>`;
  //         th.appendChild(span);
  //         th.appendChild(dropDownDiv);
  //       }
  //       tr.appendChild(th);
  //     }
  //     return tr;
  //   };

  //   createTableBodyRow = rowNum => {
  //     const tr = document.createElement('tr');
  //     tr.setAttribute('id', `r-${rowNum}`);
  //     for (let i = 0; i <= this.fieldCount; i++) {
  //       const cell = document.createElement(`${i === 0 ? 'th' : 'td'}`);
  //       if (i === 0) {
  //         cell.contentEditable = false;
  //         const span = document.createElement('span');
  //         const dropDownDiv = document.createElement('div');
  //         span.innerHTML = rowNum;
  //         dropDownDiv.setAttribute('class', 'dropdown');
  //         dropDownDiv.innerHTML = `<button class='dropbtn' id='row-dropbtn-${rowNum}'>+</button>
  //           <div id='row-dropdown-${rowNum}' class='dropdown-content'>
  //             <p class='row-insert-top'>Insert 1 row above</p>
  //             <p class='row-insert-bottom'>Insert 1 row below</p>
  //             <p class='row-delete'>Delete row</p>
  //           </div>`;
  //         cell.appendChild(span);
  //         cell.appendChild(dropDownDiv);
  //         cell.setAttribute('class', 'row-header');
  //       } else {
  //         cell.contentEditable = true;
  //       }
  //       cell.setAttribute('id', `r-${rowNum}-${i}`);
  //       // cell.id = `${rowNum}-${i}`;
  //       tr.appendChild(cell);
  //     }
  //     return tr;
  //   };

  //   createTableBody = tableBody => {
  //     for (let rowNum = 1; rowNum <= this.recordCount; rowNum++) {
  //       tableBody.appendChild(this.createTableBodyRow(rowNum));
  //     }
  //   };

  //   // Fill Data in created table from localstorage
  //   populateTable = () => {
  //     const data = this.getData();
  //     for (let i = 1; i < (data?.length || 0); i++) {
  //       for (let j = 1; j < data[i].length; j++) {
  //         const cell = document.getElementById(`r-${i}-${j}`);
  //         cell.innerHTML = data[i][j];
  //       }
  //     }
  //   };

  //   // Utility function to add row
  //   addRow = (currentRow, direction) => {
  //     let data = this.getData();
  //     const colCount = data[0].length;
  //     const newRow = new Array(colCount).fill('');
  //     if (direction === 'top') {
  //       data.splice(currentRow, 0, newRow);
  //     } else if (direction === 'bottom') {
  //       data.splice(currentRow + 1, 0, newRow);
  //     }
  //     this.recordCount++;
  //     saveData(data);
  //     this.createSpreadsheet();
  //   };

  //   // Utility function to delete row
  //   deleteRow = currentRow => {
  //     let data = this.getData();
  //     data.splice(currentRow, 1);
  //     this.recordCount++;
  //     saveData(data);
  //     this.createSpreadsheet();
  //   };

  //   // Utility function to add columns
  //   addColumn = (currentCol, direction) => {
  //     let data = this.getData();
  //     for (let i = 0; i <= this.recordCount; i++) {
  //       if (direction === 'left') {
  //         data[i].splice(currentCol, 0, '');
  //       } else if (direction === 'right') {
  //         data[i].splice(currentCol + 1, 0, '');
  //       }
  //     }
  //     this.fieldCount++;
  //     saveData(data);
  //     this.createSpreadsheet();
  //   };

  //   // Utility function to delete column
  //   deleteColumn = currentCol => {
  //     let data = this.getData();
  //     for (let i = 0; i <= this.recordCount; i++) {
  //       data[i].splice(currentCol, 1);
  //     }
  //     this.fieldCount++;
  //     saveData(data);
  //     this.createSpreadsheet();
  //   };

  //   // Map for storing the sorting history of every column;
  //   const sortingHistory = new Map();

  //   // Utility function to sort columns
  //   sortColumn = currentCol => {
  //     let spreadSheetData = this.getData();
  //     let data = spreadSheetData.slice(1);
  //     if (!data.some(a => a[currentCol] !== '')) return;
  //     if (sortingHistory.has(currentCol)) {
  //       const sortOrder = sortingHistory.get(currentCol);
  //       switch (sortOrder) {
  //         case 'desc':
  //           data.sort(ascSort.bind(this, currentCol));
  //           sortingHistory.set(currentCol, 'asc');
  //           break;
  //         case 'asc':
  //           data.sort(dscSort.bind(this, currentCol));
  //           sortingHistory.set(currentCol, 'desc');
  //           break;
  //       }
  //     } else {
  //       data.sort(ascSort.bind(this, currentCol));
  //       sortingHistory.set(currentCol, 'asc');
  //     }
  //     data.splice(0, 0, new Array(data[0].length).fill(''));
  //     saveData(data);
  //     this.createSpreadsheet();
  //   };

  //   // Compare Functions for sorting - ascending
  //   const ascSort = (currentCol, a, b) => {
  //     let _a = a[currentCol];
  //     let _b = b[currentCol];
  //     if (_a === '') return 1;
  //     if (_b === '') return -1;

  //     // Check for strings and numbers
  //     if (isNaN(_a) || isNaN(_b)) {
  //       _a = _a.toUpperCase();
  //       _b = _b.toUpperCase();
  //       if (_a < _b) return -1;
  //       if (_a > _b) return 1;
  //       return 0;
  //     }
  //     return _a - _b;
  //   };

  //   // Descending compare function
  //   const dscSort = (currentCol, a, b) => {
  //     let _a = a[currentCol];
  //     let _b = b[currentCol];
  //     if (_a === '') return 1;
  //     if (_b === '') return -1;

  //     // Check for strings and numbers
  //     if (isNaN(_a) || isNaN(_b)) {
  //       _a = _a.toUpperCase();
  //       _b = _b.toUpperCase();
  //       if (_a < _b) return 1;
  //       if (_a > _b) return -1;
  //       return 0;
  //     }
  //     return _b - _a;
  //   };

  //   createSpreadsheet(): void {
  //     const spreadsheetData = this.getData();
  //     this.recordCount = spreadsheetData.length - 1 || this.recordCount;
  //     this.fieldCount = spreadsheetData[0].length - 1 || this.fieldCount;

  //     const tableHeaderElement = document.getElementById('table-headers');
  //     const tableBodyElement = document.getElementById('table-body');

  //     const tableBody = tableBodyElement.cloneNode(true);
  //     tableBodyElement.parentNode.replaceChild(tableBody, tableBodyElement);
  //     const tableHeaders = tableHeaderElement.cloneNode(true);
  //     tableHeaderElement.parentNode.replaceChild(tableHeaders, tableHeaderElement);

  //     tableHeaders.innerHTML = '';
  //     tableBody.innerHTML = '';

  //     tableHeaders.appendChild(createHeaderRow(this.fieldCount));
  //     createTableBody(tableBody, this.recordCount, this.fieldCount);

  //     populateTable();

  //     // attach focusout event listener to whole table body container
  //     tableBody.addEventListener('focusout', function (e) {
  //       if (e.target && e.target.nodeName === 'TD') {
  //         let item = e.target;
  //         const indices = item.id.split('-');
  //         let spreadsheetData = getData();
  //         spreadsheetData[indices[1]][indices[2]] = item.innerHTML;
  //         saveData(spreadsheetData);
  //       }
  //     });

  //     // Attach click event listener to table body
  //     tableBody.addEventListener('click', function (e) {
  //       if (e.target) {
  //         if (e.target.className === 'dropbtn') {
  //           const idArr = e.target.id.split('-');
  //           document
  //             .getElementById(`row-dropdown-${idArr[2]}`)
  //             .classList.toggle('show');
  //         }
  //         if (e.target.className === 'row-insert-top') {
  //           const indices = e.target.parentNode.id.split('-');
  //           addRow(parseInt(indices[2]), 'top');
  //         }
  //         if (e.target.className === 'row-insert-bottom') {
  //           const indices = e.target.parentNode.id.split('-');
  //           addRow(parseInt(indices[2]), 'bottom');
  //         }
  //         if (e.target.className === 'row-delete') {
  //           const indices = e.target.parentNode.id.split('-');
  //           deleteRow(parseInt(indices[2]));
  //         }
  //       }
  //     });

  //     // Attach click event listener to table headers
  //     tableHeaders.addEventListener('click', function (e) {
  //       if (e.target) {
  //         if (e.target.className === 'column-header-span') {
  //           sortColumn(parseInt(e.target.parentNode.id.split('-')[2]));
  //         }
  //         if (e.target.className === 'dropbtn') {
  //           const idArr = e.target.id.split('-');
  //           document
  //             .getElementById(`col-dropdown-${idArr[2]}`)
  //             .classList.toggle('show');
  //         }
  //         if (e.target.className === 'col-insert-left') {
  //           const indices = e.target.parentNode.id.split('-');
  //           addColumn(parseInt(indices[2]), 'left');
  //         }
  //         if (e.target.className === 'col-insert-right') {
  //           const indices = e.target.parentNode.id.split('-');
  //           addColumn(parseInt(indices[2]), 'right');
  //         }
  //         if (e.target.className === 'col-delete') {
  //           const indices = e.target.parentNode.id.split('-');
  //           deleteColumn(parseInt(indices[2]));
  //         }
  //       }
  //     });
  //   }

  //   createSpreadsheet();

  //   // Close the dropdown menu if the user clicks outside of it
  //   window.onclick = function (event) {
  //     if (!event.target.matches('.dropbtn')) {
  //       var dropdowns = document.getElementsByClassName('dropdown-content');
  //       var i;
  //       for (i = 0; i < dropdowns.length; i++) {
  //         var openDropdown = dropdowns[i];
  //         if (openDropdown.classList.contains('show')) {
  //           openDropdown.classList.remove('show');
  //         }
  //       }
  //     }
  //   };

  //   document.getElementById('reset').addEventListener('click', e => {
  //     if (
  //       confirm('This will erase all data and set default configs. Are you sure?')
  //     ) {
  //   this.resetData();
  // }
  //   });
}
