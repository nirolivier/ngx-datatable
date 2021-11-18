import {Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2} from '@angular/core';
import {Column, Direction, Sort} from "../ngx-table";
import {BehaviorSubject, Observable, Subject} from "rxjs";

/**
 * This directive allow the datatable column to be sortable.
 *
 * @author Nirina Olivier razafindrabekoto
 */
@Directive({
  selector: '[sortable]'
})
export class SortableDirective implements OnInit {

  private readonly _sortChange: BehaviorSubject<Sort> = new BehaviorSubject<Sort>(new Sort());

  public sortChange!: Observable<Sort>;

  @Input('sortable')
  column!: Column;
  @Input()
  sortDirection: Direction = 'ASC';

  private _sort: Sort = new Sort();

  constructor(private _el: ElementRef,
              private _render: Renderer2) {
    // no implementation
  }

  ngOnInit(): void {
    this.sortChange = this._sortChange.asObservable();
    this._sort.column = this.column;
    this._sort.direction = this.sortDirection;
    this._sortChange.next(this._sort);
    this._updateView();
  }

  @HostListener('click')
  onClick(): void {
    this._nextDirection();
    this._sort.column = this.column;
    this._sort.direction = this.sortDirection;
    this._sortChange.next(this._sort);
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
  private _nextDirection(){
    if (this.sortDirection === 'ASC') {
      this.sortDirection = 'DESC';
    } else if (this.sortDirection === 'DESC'){
      this.sortDirection = undefined;
    } else {
      this.sortDirection = 'ASC';
    }
  }
}
