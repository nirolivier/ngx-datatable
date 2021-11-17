/**
 * This class represents the input request which is used to load data from server.
 *
 * @author Nirina Olivier razafindrabekoto
 */
import {Column} from "./column";
import {Sort} from "./sort";

export class DatatableInput {
  /** List the datatable columns  */
  columns: Column[] = [];

  /** Represent the number of element to show in the table. -1 indicates that all elements should be shown. */
  length: number = -1;

  /** This field represents the start of the page. */
  start: number = 0;

  /** This field contains a list of column to be sorted. */
  sorts: Sort[] = [];
}
