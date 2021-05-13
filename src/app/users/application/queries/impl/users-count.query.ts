import { IQuery } from '@nestjs/cqrs';
import { IFilterToAQL } from '../../../../../shared/interfaces/search-resources.interface';

export class UsersCountQuery implements IQuery {
  constructor(public readonly filters?: IFilterToAQL[]) {}
}
