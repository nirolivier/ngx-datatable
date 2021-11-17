/** Type of the sorting direction */
import {Observable} from "rxjs";
import {DatatableInput} from "./datatable-input";
import {Page} from "./page";

export type Direction = 'ASC' | 'DESC' | undefined;
export type ServerCallback<R> = (input: DatatableInput) => Observable<Page<R>>;
