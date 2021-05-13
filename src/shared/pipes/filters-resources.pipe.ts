import { Injectable, PipeTransform } from '@nestjs/common';
import {
  IFilter,
  IFilterToAQL,
} from '../interfaces/queries-resources.interface';
import { QueryParseService } from '../services/query-parse/query-parse.service';

@Injectable()
export class FiltersResourcesPipe implements PipeTransform {
  constructor(private readonly queryParseService: QueryParseService) {}

  transform(value: Record<string, IFilter[]>): IFilterToAQL[] {
    return this.parse(value);
  }

  private parse(filters: Record<string, IFilter[]> = {}): IFilterToAQL[] {
    return this.queryParseService.parseManyFiltersByKey(filters);
  }
}
