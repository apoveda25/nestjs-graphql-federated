import { Injectable, PipeTransform } from '@nestjs/common';
import { ISortToAQL } from '../interfaces/search-resources.interface';

@Injectable()
export class SortResourcesPipe implements PipeTransform {
  transform(value: Record<string, boolean | string>): ISortToAQL {
    return this.sortParse(value);
  }

  private sortParse(sort: any = {}): ISortToAQL {
    return {
      keys: Object.keys(sort).filter((key) => sort[key] === true),
      sortMode: sort.sortMode,
    };
  }
}
