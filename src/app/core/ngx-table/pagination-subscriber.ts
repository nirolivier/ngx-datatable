/**
 * This interface provides functionality to subscribe to an pagination event.
 *
 * @author Nio Rabekoto
 */
import {PageEvent} from './page-event';
import {EventEmitter} from '@angular/core';

export interface PaginationSubscriber {

  /** An observable that allow to subscribe to a page change */
  pageChange: EventEmitter<PageEvent>;

}
