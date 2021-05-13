import { Injectable } from '@nestjs/common';
import { aql, GeneratedAqlQuery } from 'arangojs/aql';
import { MatchModeID } from '../../enums/match-mode-id.enum';
import { OperatorBoolean } from '../../enums/operator-boolean.enum';
import {
  IContextFilterFirst,
  IContextFilterLast,
  IFilter,
  IFilterToAQL,
  IPagination,
  ISort,
  ISortToAQL,
} from '../../interfaces/queries-resources.interface';

@Injectable()
export class QueryParseService {
  parseManyFiltersByKey(filters: Record<string, IFilter[]>): IFilterToAQL[] {
    const filtersToAQL: IFilterToAQL[] = [];

    const keys = Object.keys(filters);

    keys.map((key: string) => {
      filters[key].map((filter: IFilter) =>
        filtersToAQL.push({ key, ...filter }),
      );
    });

    return filtersToAQL;
  }

  parseSort(sort: ISort): ISortToAQL {
    return {
      keys: Object.keys(sort).filter((key) => sort[key] === true),
      sortMode: sort.sortMode,
    };
  }

  parseOneFilterByKey(
    filters: Record<string, string | number | boolean>,
    operator: OperatorBoolean,
  ): IFilterToAQL[] {
    const keys = Object.keys(filters);

    return keys.map((key) => ({
      value: filters[key],
      key,
      matchMode: MatchModeID.EQUAL,
      operator,
    }));
  }

  filtersToAql(filters: IFilterToAQL[], node: string): GeneratedAqlQuery[] {
    return filters.map(({ key, matchMode, value, operator }, index) =>
      index
        ? this.aqlLastFilter({ node, operator, key, matchMode, value })
        : this.aqlFirstFilter({ node, operator, key, matchMode, value }),
    );
  }

  sortToAql(sort: ISortToAQL, node: string): GeneratedAqlQuery[] {
    if (!sort.keys.length) return [];

    const keysSorting = sort.keys.map((key) => `${node}.${key}`).join(',');

    return [
      aql`SORT ${aql.literal(keysSorting)} ${aql.literal(sort.sortMode)}`,
    ];
  }

  paginationToAql({ offset, count }: IPagination): GeneratedAqlQuery {
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
