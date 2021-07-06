import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesHasScopesRepository } from '../../../../infrastructure/repositories/roles-has-scopes.repository';
import { RoleHasScopeInboundQuery } from '../../impl/roles-has-scope/role-has-scope-inbound.query';

@QueryHandler(RoleHasScopeInboundQuery)
export class RoleHasScopeInboundQueryHandler
  implements IQueryHandler<RoleHasScopeInboundQuery> {
  constructor(private readonly repository: RolesHasScopesRepository) {}

  async execute({ input }: RoleHasScopeInboundQuery) {
    return await this.repository.searchIn(input);
  }
}
