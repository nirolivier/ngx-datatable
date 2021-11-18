/**
 * An interface that provides methods to retrieve the data source.
 *
 * @author Nirina Olivier razafindrabekoto
 */
import {Observable} from 'rxjs';

export interface Datasource<R> {

  /**
   * This method returns an observable of data that will be used to fill the table content.
   */
  connect(): Observable<R>;

  /**
   * This method allows to release resources that are used during the subscription in an observable object.
   */
  disconnect(): void;
}
