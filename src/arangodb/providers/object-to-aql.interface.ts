export interface IFilter {
  value: string | boolean | number;
  operator: string;
}

export interface IFilterToAQL extends IFilter {
  key: string;
  separator: string;
}

export interface IContextFilterFirst extends IFilter {
  key: string;
  node: string;
}

export interface IContextFilterLast extends IFilterToAQL {
  node: string;
}

export interface ISortToAQL {
  value: string;
  sorting: boolean;
}

export interface IContextSort extends ISortToAQL {
  node: string;
}

export interface IPagination {
  offset: number;
  count: number;
}
