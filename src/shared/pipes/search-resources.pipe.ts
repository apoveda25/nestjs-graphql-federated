import { Injectable, PipeTransform } from '@nestjs/common';
import { InputTransform } from '../../arangodb/providers/input-transform';

@Injectable()
export class SearchResourcesPipe implements PipeTransform {
  constructor(private readonly inputTransform: InputTransform) {}

  transform(value: any) {
    if (value?.separator) return this.inputTransform.filtersToArray(value);

    if (value?.sort) return this.inputTransform.sortToArray(value);

    return value;
  }
}
