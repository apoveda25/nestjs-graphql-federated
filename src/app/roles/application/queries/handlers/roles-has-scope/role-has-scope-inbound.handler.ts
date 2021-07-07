import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesHasScopesRepository } from '../../../../infrastructure/repositories/roles-has-scopes.repository';
import { RolesHasScopeInboundQuery } from '../../impl/roles-has-scope/roles-has-scope-inbound.query';

@QueryHandler(RolesHasScopeInboundQuery)
export class RoleHasScopeInboundQueryHandler
  implements IQueryHandler<RolesHasScopeInboundQuery>
{
  constructor(private readonly repository: RolesHasScopesRepository) {}

  async execute({ input }: RolesHasScopeInboundQuery) {
    return await this.repository.searchIn(input);
  }
}
