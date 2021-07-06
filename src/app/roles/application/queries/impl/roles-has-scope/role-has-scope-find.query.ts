import { IQuery } from '@nestjs/cqrs';
import { IFilterToAQL } from '../../../../../../shared/interfaces/queries-resources.interface';

export class RoleHasScopeFindQuery implements IQuery {
  constructor(public readonly input: IFilterToAQL[]) {}
}
