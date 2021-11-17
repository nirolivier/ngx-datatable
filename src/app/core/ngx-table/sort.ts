import {Column} from "./column";
import {Direction} from "./types";

/**
 * This class contains the sorting information.
 *
 * @author Nirina Olivier razafindrabekoto
 */
export class Sort {
  /** The instance of the column to be sorted. */
  column!: Column;

  /** The sort direction. By default, the column is sorted ascendant. */
  direction: Direction = 'ASC';

  constructor() {
    //no implementation
  }
}
