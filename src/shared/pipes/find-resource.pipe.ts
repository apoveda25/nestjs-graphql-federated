import { Injectable, PipeTransform } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { OperatorBoolean } from '../enums/operator-boolean.enum';
import { QueryParseService } from '../services/query-parse/query-parse.service';

@Injectable()
export class FindResourcePipe implements PipeTransform {
  constructor(private readonly queryParseService: QueryParseService) {}

  transform(filters: Record<string, string | number | boolean>) {
    if (Object.keys(filters).length)
      return this.queryParseService.parseOneFilterByKey(
        filters,
        OperatorBoolean.AND,
      );

    throw new GraphQLError('BadRequest');
  }
}
