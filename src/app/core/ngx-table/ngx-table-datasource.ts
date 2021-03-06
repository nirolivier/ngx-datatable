import {Datasource} from './datasource';
import {Observable, Subject, Subscription} from 'rxjs';
import {DatatableInput} from './datatable-input';
import {Sort} from './sort';
import {PageEvent} from './page-event';
import {ServerCallback} from './types';
import {PaginationSubscriber} from './pagination-subscriber';
import {SortSubscriber} from './sort-subscriber';


/**
 * This class is aimed to handle the server side access.
 * It provides the loading, sorting, pagination functionalities.
 * This class takes two parameter in its constructor: the input datatable of type {@link DatatableInput}
 * and the server callback function which is used by the datasource to retrieve data.
 *
 * @author Nio Rabekoto
 */
export class NgxTableDatasource<R> implements Datasource<R> {
  public sort?: SortSubscriber;
  public paginator?: PaginationSubscriber;
  private readonly _datasource: Subject<R> = new Subject<R>();
  private _sortSubscription?: Subscription;
  private _paginatorSubscription?: Subscription;

  constructor(private _input: DatatableInput,
              private _serverCallback: ServerCallback<R>) {
  }

  /**
   * Loads the data from server based on the input datatable object.
   */
  load(): void {
    if (!this._serverCallback) {
      this._datasource.next({} as R);
      return;
    }

    this._serverCallback(this._input)
      .subscribe((response: R) => this._datasource.next(response));
  }

  /**
   * {@inheritDoc}
   */
  connect(): Observable<R> {
    this._unsubscribeSort();
    this._unsubscribePaginator();

    // We subscribe to the sorting event.
    if (this.sort && this.sort.sortChange) {
      this._sortSubscription = this.sort.sortChange.subscribe((sort: Sort) => this._sortChange(sort));
    }

    // We subscribe to the pagination event.
    if (this.paginator && this.paginator.pageChange) {
      this._paginatorSubscription = this.paginator.pageChange.subscribe(pageEvent => this._pageChange(pageEvent));
    }

    // We observe the datasource.
    return this._datasource.asObservable();
  }

  /**
   * {@inheritDoc}
   */
  disconnect(): void {
    this._unsubscribeSort();
    this._unsubscribePaginator();
  }

  /**
   * Unsubscribe the sorting.
   *
   * @private
   */
  private _unsubscribeSort() {
    if (this._sortSubscription) {
      this._sortSubscription.unsubscribe();
    }
  }

  /**
   * Unsubscribe the paginator.
   *
   * @private
   */
  private _unsubscribePaginator() {
    if (this._paginatorSubscription) {
      this._paginatorSubscription.unsubscribe();
    }
  }

  /**
   * Fires when the page change.
   * @param pageEvent the page event.
   */
  private _pageChange(pageEvent: PageEvent): void {
    if (!pageEvent) {
      return;
    }

    this._input.length = pageEvent.pageSize;
    this._input.start = pageEvent.pageIndex;
    this.load();
  }

  /**
   * This method treats the sorting mechanism.
   *
   * @param sort the event sort.
   * @private
   */
  private _sortChange(sort: Sort): void {
    if (!sort || !sort.column) {
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

    this.load();
  }
}
