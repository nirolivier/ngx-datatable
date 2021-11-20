/**
 * This interface contains the column information.
 *
 * @author Nio Rabekoto
 */
export interface Column {

  /** This field contains the title header column.*/
  name?: string;

  /** This mandatory field contains the unique name of the column. Typically, it contains data property name */
  data: string;

  /** Indicates if this column should be visible */
  visible: boolean;

  /** Indicates if this column should be sortable */
  sortable: boolean;

  /** Indicates if this column should be searchable.*/
  searchable: boolean;

  /** This field contains the text to search.*/
  search?: string;

}
