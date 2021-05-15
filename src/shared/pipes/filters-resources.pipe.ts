import { Injectable, PipeTransform } from '@nestjs/common';
import {
  IFilter,
  IFilterToAQL,
} from '../interfaces/queries-resources.interface';
import { FILTER_DEFAULT } from '../queries.constant';
import { QueryParseService } from '../services/query-parse/query-parse.service';

@Injectable()
export class FiltersResourcesPipe implements PipeTransform {
  constructor(private readonly queryParseService: QueryParseService) {}

  transform(value: Record<string, IFilter[]>): IFilterToAQL[] {
    return value
      ? this.queryParseService.parseManyFiltersByKey(value)
      : FILTER_DEFAULT;
  }
}
