import { Injectable, PipeTransform } from '@nestjs/common';
import { ISort, ISortToAQL } from '../interfaces/queries-resources.interface';
import { QueryParseService } from '../services/query-parse/query-parse.service';

@Injectable()
export class SortResourcesPipe implements PipeTransform {
  constructor(private readonly queryParseService: QueryParseService) {}

  transform(value: ISort): ISortToAQL {
    return this.parse(value);
  }

  private parse(sort: ISort): ISortToAQL {
    return this.queryParseService.parseSort(sort);
  }
}
