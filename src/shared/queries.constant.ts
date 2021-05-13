import { OperatorSort } from './enums/operator-sort.enum';
import {
  IFilterToAQL,
  IPagination,
  ISortToAQL,
} from './interfaces/queries-resources.interface';

export const FILTER_DEFAULT: IFilterToAQL[] = [];
export const SORT_DEFAULT: ISortToAQL = {
  keys: [],
  sortMode: OperatorSort.ASC,
};
export const PAGINATION_DEFAULT: IPagination = { offset: 0, count: 500 };
