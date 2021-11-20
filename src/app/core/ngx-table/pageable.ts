import {SortInfo} from './sort-info';

/**
 * This interface represents the structure of a pageable data.
 *
 * @author Nio Rabekoto
 */
export interface Pageable {
  sort?: SortInfo;
  filter?: any;
  distinct?: boolean;
  pageNumber: number;
  pageSize: number;
  offset?: number;
  paged?: boolean;
  unpaged?: boolean;
}
