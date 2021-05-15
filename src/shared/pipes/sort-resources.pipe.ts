import { Injectable, PipeTransform } from '@nestjs/common';
import { ISort, ISortToAQL } from '../interfaces/queries-resources.interface';
import { SORT_DEFAULT } from '../queries.constant';
import { QueryParseService } from '../services/query-parse/query-parse.service';

@Injectable()
export class SortResourcesPipe implements PipeTransform {
  constructor(private readonly queryParseService: QueryParseService) {}

  transform(value: ISort): ISortToAQL {
    return value ? this.queryParseService.parseSort(value) : SORT_DEFAULT;
  }
}
