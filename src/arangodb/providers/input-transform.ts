import { Injectable } from '@nestjs/common';
import { IFilter, IFilterToAQL, ISortToAQL } from './object-to-aql.interface';

@Injectable()
export class InputTransform {
  filtersToArray(filters: any = {}) {
    const filtersToAQL: IFilterToAQL[] = [];

    Object.keys(filters)
      .filter((key) => Array.isArray(filters[key]))
      .map((key: string) => {
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

  sortToArray(sort: any = {}): ISortToAQL[] {
    return Object.keys(sort)
      .filter((key) => sort[key])
      .map((key) => ({
        value: sort[key] === true ? key : sort[key],
        sorting: sort[key] === true ? false : true,
      }));
  }
}
