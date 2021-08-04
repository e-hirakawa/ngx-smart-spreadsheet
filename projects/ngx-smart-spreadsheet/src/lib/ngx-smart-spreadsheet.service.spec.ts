import { TestBed } from '@angular/core/testing';

import { NgxSmartSpreadsheetService } from './ngx-smart-spreadsheet.service';

describe('NgxSmartSpreadsheetService', () => {
  let service: NgxSmartSpreadsheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSmartSpreadsheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
