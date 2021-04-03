import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScopesRepository } from '../../repositories/scopes.repository';
import { ScopesCountQuery } from '../impl/scopes-count.query';

@QueryHandler(ScopesCountQuery)
export class ScopesCountQueryHandler
  implements IQueryHandler<ScopesCountQuery> {
  constructor(private readonly repository: ScopesRepository) {}

  async execute(query: ScopesCountQuery) {
    return await this.repository.count(query.input);
  }
}
