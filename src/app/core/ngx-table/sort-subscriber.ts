import {Observable} from 'rxjs';
import {Sort} from './sort';

/**
 * An interface that provides functionalities to sort a column.
 *
 * @author Nio Rabekoto
 */
export interface SortSubscriber {

  /** This property allows to subscribe to the sort event */
  sortChange: Observable<Sort>;
}
