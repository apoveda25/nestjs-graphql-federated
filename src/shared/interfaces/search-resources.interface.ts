import { OperatorSort } from '../enums/operator-sort.enum';

export interface IFilter {
  value: string | boolean | number;
  matchMode: string;
  operator: string;
}

export interface IFilterToAQL extends IFilter {
  key: string;
}

export interface ISortToAQL {
  keys: string[];
  sortMode: OperatorSort;
}

export interface IPagination {
  offset: number;
  count: number;
}
