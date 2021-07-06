import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesHasScopesRepository } from '../../../../infrastructure/repositories/roles-has-scopes.repository';
import { RoleHasScopeOutboundQuery } from '../../impl/roles-has-scope/role-has-scope-outbound.query';

@QueryHandler(RoleHasScopeOutboundQuery)
export class RoleHasScopeOutboundQueryHandler
  implements IQueryHandler<RoleHasScopeOutboundQuery> {
  constructor(private readonly repository: RolesHasScopesRepository) {}

  async execute({ input }: RoleHasScopeOutboundQuery) {
    return await this.repository.searchOut(input);
  }
}
