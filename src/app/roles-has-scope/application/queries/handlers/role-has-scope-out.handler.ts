import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesHasScopeRepository } from '../../../infrastructure/repositories/roles-has-scope.repository';
import { RoleHasScopeOutQuery } from '../impl/role-has-scope-out.query';

@QueryHandler(RoleHasScopeOutQuery)
export class RoleHasScopeOutQueryHandler
  implements IQueryHandler<RoleHasScopeOutQuery> {
  constructor(private readonly repository: RolesHasScopeRepository) {}

  async execute(query: RoleHasScopeOutQuery) {
    return await this.repository.searchOut(query.input);
  }
}
