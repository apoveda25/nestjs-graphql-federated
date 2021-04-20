import { IQuery } from '@nestjs/cqrs';
import { IFilterToAQL } from '../../../../../arangodb/providers/object-to-aql.interface';

export class ScopesCountQuery implements IQuery {
  constructor(
    public readonly input: {
      filters: IFilterToAQL[];
    },
  ) {}
}
