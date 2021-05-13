import {
  IFilter,
  IFilterToAQL,
  ISortToAQL,
} from '../../shared/interfaces/search-resources.interface';

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
