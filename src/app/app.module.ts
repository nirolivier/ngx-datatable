import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { SortableDirective } from './core/directives/sortable.directive';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { NgxPaginator } from './ngx-paginator/ngx-paginator.component';
import {HttpClientModule} from "@angular/common/http";
import { TestDirective } from './core/ngx-table/test.directive';

@NgModule({
  declarations: [
    AppComponent,
    SortableDirective,
    NgxPaginator,
    TestDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
