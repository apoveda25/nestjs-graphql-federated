import { Injectable, PipeTransform } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { OperatorBoolean } from '../enums/operator-boolean.enum';
import { IFilterToAQL } from '../interfaces/queries-resources.interface';
import { QueryParseService } from '../services/query-parse/query-parse.service';

@Injectable()
export class FindResourcePipe implements PipeTransform {
  constructor(private readonly queryParseService: QueryParseService) {}

  transform(filters: Record<string, string | number | boolean>) {
    if (Object.keys(filters).length) return this.parse(filters);

    throw new GraphQLError('BadRequest');
  }

  private parse(
    filters: Record<string, string | number | boolean>,
  ): IFilterToAQL[] {
    return this.queryParseService.parseOneFilterByKey(
      filters,
      OperatorBoolean.AND,
    );
  }
}
