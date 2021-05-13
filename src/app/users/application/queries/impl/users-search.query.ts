import { IQuery } from '@nestjs/cqrs';
import { PaginationInput } from '../../../../../shared/dto/pagination.input';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../../../shared/interfaces/queries-resources.interface';

export class UsersSearchQuery implements IQuery {
  constructor(
    readonly input: {
      filters?: IFilterToAQL[];
      sort?: ISortToAQL;
      pagination?: PaginationInput;
    },
  ) {}
}
