import { Injectable } from '@nestjs/common';
import { IFilterToAQL } from 'src/shared/interfaces/search-resources.interface';

@Injectable()
export class InputTransform {
  resourceToArray(
    filters: Record<string, any>,
    operator: string,
    separator: string,
  ): IFilterToAQL[] {
    const keys = Object.keys(filters);

    return keys.map((key) => ({
      value: filters[key],
      key,
      operator: separator,
      matchMode: operator,
    }));
  }
}
