import { Injectable } from '@nestjs/common';
import { aql, GeneratedAqlQuery } from 'arangojs/aql';
import {
  IContextFilterFirst,
  IContextFilterLast,
  IContextSort,
  IFilterToAQL,
  IPagination,
  ISortToAQL,
} from './object-to-aql.interface';

@Injectable()
export class ObjectToAQL {
  public filtersToAql(
    filters: IFilterToAQL[],
    node: string,
  ): GeneratedAqlQuery[] {
    return filters.map(({ separator, key, operator, value }, index) =>
      index
        ? this.aqlLastFilter({ node, separator, key, operator, value })
        : this.aqlFirstFilter({ node, key, operator, value }),
    );
  }

  public sortToAql(sort: ISortToAQL[], node: string): GeneratedAqlQuery[] {
    return sort.map((el, index) => {
      return index
        ? this.aqlLastSort({ ...el, node })
        : this.aqlFirstSort({ ...el, node });
    });
  }

  public paginationToAql({ offset, count }: IPagination): GeneratedAqlQuery {
    return aql`LIMIT ${offset}, ${count}`;
  }

  private aqlFirstFilter({ node, key, operator, value }: IContextFilterFirst) {
    return aql`FILTER ${aql.literal(node)}.${aql.literal(key)} ${aql.literal(
      operator,
    )} ${value} `;
  }

  private aqlLastFilter({
    node,
    separator,
    key,
    operator,
    value,
  }: IContextFilterLast) {
    return aql` ${aql.literal(separator)} ${aql.literal(node)}.${aql.literal(
      key,
    )} ${aql.literal(operator)} ${value} `;
  }

  private aqlFirstSort({ node, value }: IContextSort) {
    return aql`SORT ${aql.literal(node)}.${value}`;
  }

  private aqlLastSort({ node, value, sorting }: IContextSort) {
    return sorting ? aql` ${value}` : aql`, ${aql.literal(node)}.${value}`;
  }
}
