import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSmartSpreadsheetComponent } from './ngx-smart-spreadsheet.component';

describe('NgxSmartSpreadsheetComponent', () => {
  let component: NgxSmartSpreadsheetComponent;
  let fixture: ComponentFixture<NgxSmartSpreadsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSmartSpreadsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSmartSpreadsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
