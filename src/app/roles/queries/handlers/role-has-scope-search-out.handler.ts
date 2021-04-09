import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesHasScopeRepository } from '../../repositories/roles-has-scope.repository';
import { RoleHasScopeSearchOutQuery } from '../impl/role-has-scope-search-out.query';

@QueryHandler(RoleHasScopeSearchOutQuery)
export class RoleHasScopeSearchOutQueryHandler
  implements IQueryHandler<RoleHasScopeSearchOutQuery> {
  constructor(private readonly repository: RolesHasScopeRepository) {}

  async execute(query: RoleHasScopeSearchOutQuery) {
    return await this.repository.searchOut(query.input);
  }
}
