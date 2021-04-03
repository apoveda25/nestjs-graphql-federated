import { Injectable } from '@nestjs/common';
import { IFilter, IFilterToAQL, ISortToAQL } from './object-to-aql.interface';

@Injectable()
export class InputTransform {
  filtersToArray(filters: any = {}): IFilterToAQL[] {
    const filtersToAQL: IFilterToAQL[] = [];

    const keys = Object.keys(filters);

    const keysWithArrayValue = keys.filter((key) =>
      Array.isArray(filters[key]),
    );

    keysWithArrayValue.map((key: string) => {
      filters[key].map((filter: IFilter) =>
        filtersToAQL.push({
          key,
          ...filter,
          separator: filters.separator,
        }),
      );
    });

    return filtersToAQL;
  }

  resourceToArray(
    filters: Record<string, any>,
    operator: string,
    separator: string,
  ): IFilterToAQL[] {
    const keys = Object.keys(filters);

    return keys.map((key) => ({
      value: filters[key],
      key,
      operator,
      separator,
    }));
  }

  sortToArray(sort: any = {}): ISortToAQL[] {
    return Object.keys(sort)
      .filter((key) => sort[key])
      .map((key) => ({
        value: sort[key] === true ? key : sort[key],
        sorting: sort[key] === true ? false : true,
      }));
  }
}
