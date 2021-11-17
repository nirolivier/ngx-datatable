/**
 * This class defines the datatable column structure
 *
 * @author Nirina Olivier razafindrabekoto
 */
export class Column {

  /** This contains the title header column.*/
  name: string = '';

  /** This contains the unique name of the column. Typically, it contains the name the data property name. */
  data!: string;

  /** Indicates if the column should be visible */
  visible: boolean = true;

  /** Indicates if the column should be sortable */
  sortable: boolean = true;

  /** Indicates if the column should be searchable.*/
  searchable: boolean = true;

  /** Contains the text to search.*/
  search: string = '';

  constructor() {
  }
}
