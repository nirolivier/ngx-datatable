import {Observable} from 'rxjs';
import {Sort} from './sort';

/**
 * An interface that provides functionalities to sort a column.
 *
 * @author Nirina Olivier razafindrabekoto
 */
export interface SortSubscriber {

  /** This property allows to subscribe to the sort event */
  sortChange: Observable<Sort>;
}
