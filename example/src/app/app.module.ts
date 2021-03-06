import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSmartSpreadsheetModule } from 'ngx-smart-spreadsheet';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgxSmartSpreadsheetModule
  ],
  exports: [
    NgxSmartSpreadsheetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
