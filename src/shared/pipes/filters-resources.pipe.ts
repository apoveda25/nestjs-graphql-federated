import { Injectable, PipeTransform } from '@nestjs/common';
import {
  IFilter,
  IFilterToAQL,
} from '../interfaces/search-resources.interface';

@Injectable()
export class FiltersResourcesPipe implements PipeTransform {
  transform(value: Record<string, IFilter[]>): IFilterToAQL[] {
    return this.filtersParse(value);
  }

  private filtersParse(filters: any = {}): IFilterToAQL[] {
    const filtersToAQL: IFilterToAQL[] = [];

    const keys = Object.keys(filters);

    keys.map((key: string) => {
      filters[key].map((filter: IFilter) =>
        filtersToAQL.push({ key, ...filter }),
      );
    });

    return filtersToAQL;
  }
}
