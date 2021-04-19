import { IQuery } from '@nestjs/cqrs';
import { IFilterToAQL } from '../../../../../arangodb/providers/object-to-aql.interface';

export class UsersCountQuery implements IQuery {
  constructor(public readonly filters: IFilterToAQL[]) {}
}
