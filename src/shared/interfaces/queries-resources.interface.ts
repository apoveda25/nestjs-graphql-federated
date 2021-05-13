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

export interface IContextFilterFirst extends IFilter {
  key: string;
  node: string;
}

export interface IContextFilterLast extends IFilterToAQL {
  node: string;
}

export interface IContextSort extends ISortToAQL {
  node: string;
}

export interface ISort extends Record<string, boolean | any> {
  sortMode: OperatorSort;
}
