/**
 * An interface which represents a paginator component.
 * It provides methods that are used to manage the pagination.
 *
 * @author Nirina Olivier razafindrabekoto
 */
import {PageEvent} from './page-event';
import {EventEmitter} from '@angular/core';

export interface Paginator {

  /** An observable that allow to subscribe to a page change */
  pageChange: EventEmitter<PageEvent>;

}
