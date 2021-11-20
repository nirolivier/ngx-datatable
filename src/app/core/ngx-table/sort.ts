import {Column} from './column';
import {Direction} from './types';

/**
 * This class contains the sorting information.
 *
 * @author Nio Rabekoto
 */
export interface Sort {
  /** The instance of the column to be sorted. */
  column: Column;

  /** The sort direction. By default, the column is sorted ascendant. */
  direction: Direction;
}
