import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PageEvent} from "../core/ngx-table";

const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'ngx-paginator',
  templateUrl: './ngx-paginator.component.html',
  styleUrls: ['./ngx-paginator.component.scss']
})
export class NgxPaginatorComponent implements OnInit, OnChanges {

  @Input()
  length!: number;

  @Output()
  page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  range: number[] = [];
  pageIndex!: number;
  private _initialized: boolean = false;

  constructor() {
  }

  private _pageSizeOptions: number[] = [];

  get pageSizeOptions() {
    return this._pageSizeOptions;
  }

  @Input()
  set pageSizeOptions(array: number[]) {
    this._pageSizeOptions = array || [];
    this._updatePageSizeOptions();
  }

  private _pageSize: number = 0;

  get pageSize() {
    return this._pageSize;
  }

  @Input()
  set pageSize(pageSize: number) {
    this._pageSize = (pageSize === null || pageSize === undefined) ? 0 : pageSize;
    this._updatePageSizeOptions();
  }

  ngOnInit(): void {
    this._initialized = true;
    this.pageIndex = 0;
    this._updatePageSizeOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['length']) {
      this.range = [...Array(changes['length'].currentValue).keys()];
    }
  }

  /**
   * Fires when the first page link is clicked
   */
  onFirstPageClicked() {
    if (!this.hasPreviousPage()) {
      return;
    }
    const previousPageIndex = this.pageIndex;
    this.pageIndex = 0;
    this._emitPageEvent(previousPageIndex);
  }

  /**
   * Fires when the previous page link is clicked
   */
  onPreviousPageClicked() {
    if (!this.hasPreviousPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex--;
    this._emitPageEvent(previousPageIndex);
  }

  /**
   * Fires when the page item link is clicked
   */
  onPageClicked(index: number) {
    const previousPageIndex = index - 1;
    this.pageIndex = index;
    this._emitPageEvent(previousPageIndex);
  }

  /**
   * Fires when the next page link is clicked
   */
  onNextPageClicked() {
    if (!this.hasNextPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex++;
    this._emitPageEvent(previousPageIndex);
  }

  /**
   * Fires when the last page link is clicked
   */
  onLastPageClicked() {
    if (!this.hasNextPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.getNumberOfPages() - 1;
    this._emitPageEvent(previousPageIndex);
  }

  /**
   * Indicates if previous page exists
   */
  hasPreviousPage(): boolean {
    return this.pageIndex >= 1 && this.pageSize != 0;
  }

  /**
   * Indicates if next page exists
   */
  hasNextPage(): boolean {
    const maxPageIndex = this.getNumberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize != 0;
  }

  /** Get the number of pages */
  getNumberOfPages(): number {
    if (!this.pageSize) {
      return 0;
    }

    return Math.ceil(this.length / this.pageSize);
  }

  /**
   * Show the interval of the page.
   *
   * @param pageIndex the page index
   * @param pageSize the page size
   * @param length the total length of record
   */
  getRangeLabel(pageIndex: number, pageSize: number, length: number): string {
    if (length == 0 || pageSize == 0) {
      return `0 of ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} of ${length}`;
  };

  /**
   * Fires when the page size changed
   * @param pageSize the page size
   */
  onPageSizeChange(pageSize: number) {
    const startIndex = this.pageIndex * this.pageSize;
    const previousPageIndex = this.pageIndex;

    this.pageIndex = Math.floor(startIndex / pageSize) || 0;
    this.pageSize = pageSize;
    this._emitPageEvent(previousPageIndex);
  }

  private _emitPageEvent(previousPageIndex: number): void {
    return this.page.emit({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      previousPageIndex: previousPageIndex,
      length: this.length
    });
  }

  private _updatePageSizeOptions() {
    if (!this._initialized) {
      return;
    }

    // If no page size is provided, use the first page size option or the default page size.
    if (!this.pageSize) {
      this._pageSize =
        this.pageSizeOptions.length != 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
    }

    if (this._pageSizeOptions.indexOf(this.pageSize) === -1) {
      this._pageSizeOptions.push(this.pageSize);
    }

    // Sort the numbers using a number-specific sort function.
    this._pageSizeOptions.sort((a, b) => a - b);
  }
}
