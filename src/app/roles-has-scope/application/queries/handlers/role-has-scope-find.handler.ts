import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesHasScopeRepository } from '../../../infrastructure/repositories/roles-has-scope.repository';
import { RoleHasScopeFindQuery } from '../impl/role-has-scope-find.query';

@QueryHandler(RoleHasScopeFindQuery)
export class RoleHasScopeFindAndQueryHandler
  implements IQueryHandler<RoleHasScopeFindQuery> {
  constructor(private readonly repository: RolesHasScopeRepository) {}

  async execute({ input }: RoleHasScopeFindQuery) {
    return await this.repository.find(input);
  }
}
