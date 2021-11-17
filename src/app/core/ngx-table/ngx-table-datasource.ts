import {Datasource} from "./datasource";
import {Observable, Subject, Subscription} from "rxjs";
import {DatatableInput} from "./datatable-input";
import {Sort} from "./sort";
import {PageEvent} from "./page-event";
import {ServerCallback} from "./types";
import {SortableDirective} from "../../directives/sortable.directive";
import {Page} from "./page";
import {NgxPaginatorComponent} from "../../ngx-paginator/ngx-paginator.component";


/**
 * This class is aimed to handle the server side access.
 * It provides the loading, sorting, pagination functionality.
 *
 * @author Nirina Olivier razafindrabekoto
 */
export class NgxTableDatasource<R> implements Datasource<Page<R>> {
  public sort!: SortableDirective;
  public paginator!: NgxPaginatorComponent;
  private readonly _datasource: Subject<Page<R>> = new Subject<Page<R>>();
  private _input!: DatatableInput;
  private _sortSubscription!: Subscription;

  constructor(private _inputDatatable: DatatableInput,
              private _serverCallback: ServerCallback<R>) {
    this._input = this._inputDatatable;
    // no implementation
  }

  /**
   * Load the data from server based on the input datatable object.
   * @param input the input datatable.
   */
  load(input: DatatableInput): void {
    this._input = input;

    if (!this._serverCallback) {
      this._datasource.next({} as Page<R>);
      return;
    }

    this._serverCallback(input)
      .subscribe((page: Page<R>) => this._datasource.next(page));
  }

  /**
   * {@inheritDoc}
   */
  connect(): Observable<Page<R>> {
    this._unsubscribeSort();

    // We subscribe to the sorting event.
    if (this.sort) {
      this._sortSubscription = this.sort.sortChange.subscribe((sort: Sort) => this._sortChange(sort));
    }

    if (this.paginator) {
      this.paginator.page.asObservable().subscribe(pageEvent => this._pageChange(pageEvent))
    }

    // We observe the datasource.
    return this._datasource.asObservable();
  }

  /**
   * {@inheritDoc}
   */
  disconnect(): void {
    this._unsubscribeSort();
  }

  /**
   * Fires when the page change.
   * @param pageEvent the page event.
   */
  private _pageChange(pageEvent: PageEvent): void {
    this._input.length = pageEvent.pageSize;
    this._input.start = pageEvent.pageIndex;
    this.load(this._input);
  }

  private _unsubscribeSort() {
    if (this._sortSubscription) {
      this._sortSubscription.unsubscribe();
    }
  }

  /**
   * This method treats the sorting mechanism.
   *
   * @param sort the event sort.
   * @private
   */
  private _sortChange(sort: Sort): void {
    if (!sort.column) {
      return;
    }

    const toSortIndex = this._input.sorts.findIndex(toSort => toSort.column && toSort.column.data === sort.column.data);

    // If the event sort direction is undefined, we remove the column from list of sorted column.
    if (!sort.direction && toSortIndex !== -1) {
      this._input.sorts.splice(toSortIndex, 1);
    }

    // If the event sort direction exists and the column to be sorted is already in the sortable list, change only its value.
    if (sort.direction && toSortIndex !== -1) {
      const toSort = this._input.sorts[toSortIndex];
      toSort.column = sort.column;
      toSort.direction = sort.direction;
    }

    // If the event sort direction exists and the column to be sorted is not in the sortable list, add it.
    if (sort.direction && toSortIndex === -1) {
      this._input.sorts.push(sort);
    }

    this.load(this._input);
  }
}
