import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesHasScopeRepository } from '../../repositories/roles-has-scope.repository';
import { RoleHasScopeInQuery } from '../impl/role-has-scope-in.query';

@QueryHandler(RoleHasScopeInQuery)
export class RoleHasScopeInQueryHandler
  implements IQueryHandler<RoleHasScopeInQuery> {
  constructor(private readonly repository: RolesHasScopeRepository) {}

  async execute(query: RoleHasScopeInQuery) {
    return await this.repository.searchIn(query.input);
  }
}
