import {Pageable} from "./pageable";
import {SortInfo} from "./sort-info";

/**
 * This interface represent the datatable output
 *
 * @param <R> the type of the returned data
 * @param <S> the type of the sorting
 * @author Nirina Olivier razafindrabekoto
 */
export interface Page<R> {
  content?: R[];
  pageable: Pageable;
  last?: boolean;
  totalElements?: number;
  totalPages?: number;
  first?: boolean;
  number?: number;
  sort?: SortInfo;
  numberOfElements?: number;
  size?: number;
  empty?: boolean;
}
