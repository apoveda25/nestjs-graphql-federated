import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesHasScopeRepository } from '../../repositories/roles-has-scope.repository';
import { RoleHasScopeFindAndQuery } from '../impl/role-has-scope-find-and.query';

@QueryHandler(RoleHasScopeFindAndQuery)
export class RoleHasScopeFindAndQueryHandler
  implements IQueryHandler<RoleHasScopeFindAndQuery> {
  constructor(private readonly repository: RolesHasScopeRepository) {}

  async execute(query: RoleHasScopeFindAndQuery) {
    return await this.repository.findAnd(query.input);
  }
}
