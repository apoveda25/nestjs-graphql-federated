import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersHasRoleRepository } from 'src/app/users/infrastructure/repositories/users-has-role.repository';
import { UsersHasRoleInboundQuery } from '../../impl/users-has-role/users-has-role-inbound.query';

@QueryHandler(UsersHasRoleInboundQuery)
export class UsersHasRoleInboundQueryHandler
  implements IQueryHandler<UsersHasRoleInboundQuery>
{
  constructor(private readonly repository: UsersHasRoleRepository) {}

  async execute(query: UsersHasRoleInboundQuery) {
    return await this.repository.searchIn(query.input);
  }
}
