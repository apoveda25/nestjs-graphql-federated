import { IQuery } from '@nestjs/cqrs';
import { IFilterToAQL } from 'src/shared/interfaces/queries-resources.interface';

export class UserHasRoleFindQuery implements IQuery {
  constructor(public readonly input: IFilterToAQL[]) {}
}
