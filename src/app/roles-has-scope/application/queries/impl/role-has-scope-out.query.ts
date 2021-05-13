import { IQuery } from '@nestjs/cqrs';
import { PaginationInput } from '../../../../../shared/dto/pagination.input';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../../../shared/interfaces/queries-resources.interface';

export class RoleHasScopeOutQuery implements IQuery {
  constructor(
    public readonly input: {
      parentId: string;
      filters?: IFilterToAQL[];
      sort?: ISortToAQL;
      pagination?: PaginationInput;
    },
  ) {}
}
