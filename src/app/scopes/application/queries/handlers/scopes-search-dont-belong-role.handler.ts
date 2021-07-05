import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScopesRepository } from '../../../infrastructure/repositories/scopes.repository';
import { ScopesSearchDontBelongRoleQuery } from '../impl/scopes-search-dont-belong-role.query';

@QueryHandler(ScopesSearchDontBelongRoleQuery)
export class ScopesSearchDontBelongRoleQueryHandler
  implements IQueryHandler<ScopesSearchDontBelongRoleQuery> {
  constructor(private readonly scopesRepository: ScopesRepository) {}

  async execute(query: ScopesSearchDontBelongRoleQuery) {
    return await this.scopesRepository.searchDontBelongRole(query.input);
  }
}
