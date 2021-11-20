import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {Column, Direction, Sort} from "../ngx-table";
import {Observable, Subject} from "rxjs";
import {SortSubscriber} from '../ngx-table/sort-subscriber';

/**
 * This directive allows to sort a table column.
 * By default the sort direction is set to 'ASC'.
 * The sorting flow is defined as follow: <code>'ASC'->'DESC'->'undefined'->'ASC'.</code>
 *
 *
 * @author Nio Rabekoto
 */
@Directive({
  selector: '[sortable]'
})
export class SortableDirective implements OnInit, SortSubscriber {

  public sortChange!: Observable<Sort>;

  @Input('sortable')
  column!: Column;

  private readonly _sortChange: Subject<Sort> = new Subject<Sort>();
  private _direction: Direction = 'ASC';

  constructor(private _el: ElementRef,
              private _render: Renderer2) {
    // no implementation
  }

  get sortDirection() {
    return this._direction;
  }

  @Input()
  set sortDirection(direction: Direction) {
    this._direction = direction;
  }

  ngOnInit(): void {
    this.sortChange = this._sortChange.asObservable();
    this._updateView();
  }

  @HostListener('click')
  onClick(): void {
    this._nextDirection();
    this._emitSortEvent();
    this._updateView();
  }

  /**
   * This method update the view by setting the sort icon.
   * @private
   */
  private _updateView() {
    // TODO Here you put your view update behavior
  }

  /**
   * Determines the sorting direction state. If the current sorting direction is set to 'ASC' then next is 'DESC'.
   * If the current sorting direction is set to 'DESC' then the next is 'undefined'.
   * If the current direction is set to 'undefined' then the next is 'ASC'.
   *
   * @private
   */
  private _nextDirection(): void {
    if (this._direction === 'ASC') {
      this._direction = 'DESC';
    } else if (this._direction === 'DESC') {
      this._direction = undefined;
    } else {
      this._direction = 'ASC';
    }
  }

  /**
   * Emit the sort event.
   * @private
   */
  private _emitSortEvent(): void {
    this._sortChange.next({column: this.column, direction: this.sortDirection});
  }
}
