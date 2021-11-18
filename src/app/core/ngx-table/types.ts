/** Type of the sorting direction */
import {Observable} from "rxjs";
import {DatatableInput} from "./datatable-input";

export type Direction = 'ASC' | 'DESC' | null;
export type ServerCallback<R> = (input: DatatableInput) => Observable<R>;
