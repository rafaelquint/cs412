import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { ResultComponentComponent } from './result-component/result-component.component';
import {RouterModule} from "@angular/router";
import { FormComponent } from './form/form.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    FormComponentComponent,
    ResultComponentComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [FormComponentComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
