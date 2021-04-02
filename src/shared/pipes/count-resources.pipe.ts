import { Injectable, PipeTransform } from '@nestjs/common';
import { InputTransform } from '../../arangodb/providers/input-transform';

@Injectable()
export class CountResourcesPipe implements PipeTransform {
  constructor(private readonly inputTransform: InputTransform) {}

  transform(value: any) {
    return this.inputTransform.filtersToArray(value);
  }
}
