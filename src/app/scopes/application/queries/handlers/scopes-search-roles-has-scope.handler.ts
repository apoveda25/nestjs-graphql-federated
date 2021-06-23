import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScopesRepository } from '../../../infrastructure/repositories/scopes.repository';
import { ScopesSearchRolesHasScopeQuery } from '../impl/scopes-search-roles-has-scope.query';

@QueryHandler(ScopesSearchRolesHasScopeQuery)
export class ScopesSearchRolesHasScopeQueryHandler
  implements IQueryHandler<ScopesSearchRolesHasScopeQuery> {
  constructor(private readonly repository: ScopesRepository) {}

  async execute(query: ScopesSearchRolesHasScopeQuery) {
    return await this.repository.searchRolesHasScopes(query.input);
  }
}
