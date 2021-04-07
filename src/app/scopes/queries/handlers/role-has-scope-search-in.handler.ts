import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesHasScopeRepository } from '../../repositories/roles-has-scope.repository';
import { RoleHasScopeSearchInQuery } from '../impl/role-has-scope-search-in.query';

@QueryHandler(RoleHasScopeSearchInQuery)
export class RoleHasScopeSearchInQueryHandler
  implements IQueryHandler<RoleHasScopeSearchInQuery> {
  constructor(private readonly repository: RolesHasScopeRepository) {}

  async execute(query: RoleHasScopeSearchInQuery) {
    return await this.repository.searchIn(query.input);
  }
}
