/**
 * This interface contains the page event information.
 *
 * @author Nirina Olivier razafindrabekoto
 */
export interface PageEvent {

  /** Contains the page size */
  pageSize: number;

  /** Contains the current page index */
  pageIndex: number;

  /** Contains the previous page index */
  previousPageIndex?: number;

  /** Contains the total number of elements being paged */
  length: number;
}
