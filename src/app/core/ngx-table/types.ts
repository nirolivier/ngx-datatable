/** Type of the sorting direction */
import {Observable} from 'rxjs';
import {DatatableInput} from './datatable-input';

export type Direction = 'ASC' | 'DESC' | undefined;
export type ServerCallback<R> = (input: DatatableInput) => Observable<R>;
