import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {map, Observable} from "rxjs";
import {SampleEntity} from "./sample-entity";
import {Column, DatatableInput, NgxTableDatasource, Page} from "./core/ngx-table";
import {HttpClient} from "@angular/common/http";
import {SortableDirective} from "./core/directives/sortable.directive";
import {NgxPaginator} from "./ngx-paginator/ngx-paginator.component";


const idColumn = {data: 'id', name: 'id', search: '', searchable: true, sortable: true, visible: true};
const nomColumn = {data: 'nom', name: 'Nom', search: '', searchable: true, sortable: true, visible: true};
const prenomColumn = {data: 'prenom', name: 'Prenom', search: '', searchable: true, sortable: true, visible: true};
const ageColumn = {data: 'age', name: 'Age', search: '', searchable: true, sortable: true, visible: true};

/**
 * Defines the list of the columns
 */
const columnDefs: Column[] = [idColumn, nomColumn, prenomColumn, ageColumn];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  data$!: Observable<SampleEntity[]>;
  displayedColumns: Column[] = columnDefs;

  @ViewChild(SortableDirective) sort!: SortableDirective;
  @ViewChild(NgxPaginator) paginator!: NgxPaginator;
  length!: number;
  pageSize!: number;
  private readonly _ngxDataSource: NgxTableDatasource<Page<SampleEntity>>;
  private readonly _inputRequest: DatatableInput;

  constructor(private _httpClient: HttpClient) {
    this._inputRequest = new DatatableInput();
    this._inputRequest.columns = columnDefs;
    this._inputRequest.sorts = [{column: idColumn, direction: 'ASC'}];
    this._inputRequest.length = 10;
    this._inputRequest.start = 0;
    this._ngxDataSource = new NgxTableDatasource(this._inputRequest, (input) => this.loadData(input));
  }

  ngOnDestroy(): void {
    this._ngxDataSource.disconnect();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // We register the sort directive
    this._ngxDataSource.sort = this.sort;
    // We register the paginator component
    this._ngxDataSource.paginator = this.paginator;

    // We connect the datasource. We subscribe to the datasource.
    this.data$ = this._ngxDataSource.connect().pipe(map(response => {
      //TODO Put here your mapping of the pagination info which is returned from the server. This is an sample mapping.
      this.length = response.totalElements!;
      this.pageSize = response.size!;

      // Return the data.
      return response.content as SampleEntity[];
    }));

    // Finally we load the data. This will trigger the connect function.
    this._ngxDataSource.load();
  }


  private loadData(input: DatatableInput): Observable<Page<SampleEntity>> {
    // FIXME Here you define the behavior for retrieving your data.
    return this._httpClient.post<Page<SampleEntity>>('/assets/data/data.json', input);
  }
}

