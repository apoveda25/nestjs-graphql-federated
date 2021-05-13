import { Injectable } from '@nestjs/common';
import { aql, GeneratedAqlQuery } from 'arangojs/aql';
import {
  IFilterToAQL,
  IPagination,
  ISortToAQL,
} from '../../shared/interfaces/search-resources.interface';
import {
  IContextFilterFirst,
  IContextFilterLast,
} from '../interfaces/object-to-aql.interface';

@Injectable()
export class ObjectToAQL {
  public filtersToAql(
    filters: IFilterToAQL[],
    node: string,
  ): GeneratedAqlQuery[] {
    return filters.map(({ key, matchMode, value, operator }, index) =>
      index
        ? this.aqlLastFilter({ node, operator, key, matchMode, value })
        : this.aqlFirstFilter({ node, operator, key, matchMode, value }),
    );
  }

  public sortToAql(sort: ISortToAQL, node: string): GeneratedAqlQuery[] {
    if (!sort.keys.length) return [];

    const keysSorting = sort.keys.map((key) => `${node}.${key}`).join(',');

    return [
      aql`SORT ${aql.literal(keysSorting)} ${aql.literal(sort.sortMode)}`,
    ];
  }

  public paginationToAql({ offset, count }: IPagination): GeneratedAqlQuery {
    return aql`LIMIT ${offset}, ${count}`;
  }

  private aqlFirstFilter({ node, key, matchMode, value }: IContextFilterFirst) {
    return aql`FILTER ${aql.literal(node)}.${aql.literal(key)} ${aql.literal(
      matchMode,
    )} ${value} `;
  }

  private aqlLastFilter({
    node,
    operator,
    key,
    matchMode,
    value,
  }: IContextFilterLast) {
    return aql` ${aql.literal(operator)} ${aql.literal(node)}.${aql.literal(
      key,
    )} ${aql.literal(matchMode)} ${value} `;
  }
}
