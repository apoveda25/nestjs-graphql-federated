import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesHasScopesRepository } from '../../../../infrastructure/repositories/roles-has-scopes.repository';
import { RolesHasScopeOutboundQuery } from '../../impl/roles-has-scope/roles-has-scope-outbound.query';

@QueryHandler(RolesHasScopeOutboundQuery)
export class RoleHasScopeOutboundQueryHandler
  implements IQueryHandler<RolesHasScopeOutboundQuery>
{
  constructor(private readonly repository: RolesHasScopesRepository) {}

  async execute({ input }: RolesHasScopeOutboundQuery) {
    return await this.repository.searchOut(input);
  }
}
