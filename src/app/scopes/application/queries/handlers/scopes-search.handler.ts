import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScopesRepository } from '../../../infrastructure/repositories/scopes.repository';
import { ScopesSearchQuery } from '../impl/scopes-search.query';

@QueryHandler(ScopesSearchQuery)
export class ScopesSearchQueryHandler
  implements IQueryHandler<ScopesSearchQuery> {
  constructor(private readonly repository: ScopesRepository) {}

  async execute(query: ScopesSearchQuery) {
    return await this.repository.search(query.input);
  }
}
