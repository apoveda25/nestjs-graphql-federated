import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScopesRepository } from '../../../infrastructure/repositories/scopes.repository';
import { ScopesSearchFilterByRoleQuery } from '../impl/scopes-search-filter-by-role.query';

@QueryHandler(ScopesSearchFilterByRoleQuery)
export class ScopesSearchFilterByRoleQueryHandler
  implements IQueryHandler<ScopesSearchFilterByRoleQuery> {
  constructor(private readonly repository: ScopesRepository) {}

  async execute(query: ScopesSearchFilterByRoleQuery) {
    return await this.repository.searchFilterByRole(query.input);
  }
}
