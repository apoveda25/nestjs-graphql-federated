import { IQuery } from '@nestjs/cqrs';
import { PaginationInput } from 'src/shared/dto/pagination.input';
import {
  IFilterToAQL,
  ISortToAQL,
} from 'src/shared/interfaces/queries-resources.interface';

export class UsersHasRoleInboundQuery implements IQuery {
  constructor(
    public readonly input: {
      parentId: string;
      filters?: IFilterToAQL[];
      sort?: ISortToAQL;
      pagination?: PaginationInput;
    },
  ) {}
}
