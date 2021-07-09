import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesHasScopesRepository } from '../../../../infrastructure/repositories/roles-has-scopes.repository';
import { RoleHasScopeFindQuery } from '../../impl/roles-has-scope/role-has-scope-find.query';

@QueryHandler(RoleHasScopeFindQuery)
export class RoleHasScopeFindQueryHandler
  implements IQueryHandler<RoleHasScopeFindQuery> {
  constructor(private readonly repository: RolesHasScopesRepository) {}

  async execute({ input }: RoleHasScopeFindQuery) {
    return await this.repository.find(input);
  }
}
