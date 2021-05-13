import { IQuery } from '@nestjs/cqrs';
import { IFilterToAQL } from '../../../../../shared/interfaces/queries-resources.interface';

export class ScopesCountQuery implements IQuery {
  constructor(
    public readonly input: {
      filters?: IFilterToAQL[];
    },
  ) {}
}
