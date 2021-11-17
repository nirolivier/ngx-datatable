/**
 * This interface allow to an object to act as datasource.
 *
 * @author Nirina Olivier razafindrabekoto
 */
import {Observable} from "rxjs";

export interface Datasource<R> {

  /**
   * Initialize the datatable
   */
  connect(): Observable<R>;

  /**
   * Used to release resource
   */
  disconnect(): void;
}
