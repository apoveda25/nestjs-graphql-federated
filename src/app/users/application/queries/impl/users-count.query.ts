import { IQuery } from '@nestjs/cqrs';
import { IFilterToAQL } from '../../../../../shared/interfaces/queries-resources.interface';

export class UsersCountQuery implements IQuery {
  constructor(public readonly filters?: IFilterToAQL[]) {}
}
