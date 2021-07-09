import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesHasScopesRepository } from '../../../../infrastructure/repositories/roles-has-scopes.repository';
import { RolesHasScopeOutboundOrphansQuery } from '../../impl/roles-has-scope/roles-has-scope-outbound-orphans.query';

@QueryHandler(RolesHasScopeOutboundOrphansQuery)
export class RoleHasScopeOutboundOrphansQueryHandler
  implements IQueryHandler<RolesHasScopeOutboundOrphansQuery>
{
  constructor(private readonly repository: RolesHasScopesRepository) {}

  async execute({ input }: RolesHasScopeOutboundOrphansQuery) {
    return await this.repository.searchOutOrphans(input);
  }
}
