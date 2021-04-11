import { IQuery } from '@nestjs/cqrs';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../../arangodb/providers/object-to-aql.interface';
import { PaginationInput } from '../../../../shared/dto/pagination.input';

export class UsersSearchQuery implements IQuery {
  constructor(
    readonly input: {
      filters: IFilterToAQL[];
      sort: ISortToAQL[];
      pagination: PaginationInput;
    },
  ) {}
}
