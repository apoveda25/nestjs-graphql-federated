import { Injectable, PipeTransform } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { IFilterToAQL } from '../../shared/interfaces/queries-resources.interface';
import { OperatorBoolean } from '../enums/operator-boolean.enum';
import { QueryParseService } from '../services/query-parse/query-parse.service';

@Injectable()
export class CurrentResourcePipe implements PipeTransform {
  constructor(private readonly queryParseService: QueryParseService) {}

  transform(value: any): IFilterToAQL[] {
    if (Object.keys(value).length)
      return this.queryParseService.parseOneFilterByKey(
        { _id: value._id },
        OperatorBoolean.AND,
      );

    throw new GraphQLError('BadRequest');
  }
}
