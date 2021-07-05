import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesHasScopesRepository } from '../../../../infrastructure/repositories/roles-has-scopes.repository';
import { RoleHasScopeInQuery } from '../../impl/roles-has-scope/role-has-scope-in.query';

@QueryHandler(RoleHasScopeInQuery)
export class RoleHasScopeInQueryHandler
  implements IQueryHandler<RoleHasScopeInQuery> {
  constructor(private readonly repository: RolesHasScopesRepository) {}

  async execute(query: RoleHasScopeInQuery) {
    return await this.repository.searchIn(query.input);
  }
}
