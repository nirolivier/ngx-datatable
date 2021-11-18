import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { SortableDirective } from './core/directives/sortable.directive';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { NgxPaginatorComponent } from './ngx-paginator/ngx-paginator.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    SortableDirective,
    NgxPaginatorComponent
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
