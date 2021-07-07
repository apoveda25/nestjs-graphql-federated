import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersHasRoleRepository } from 'src/app/users/infrastructure/repositories/users-has-role.repository';
import { UsersHasRoleOutboundQuery } from '../../impl/users-has-role/users-has-role-outbound.query';

@QueryHandler(UsersHasRoleOutboundQuery)
export class UsersHasRoleOutboundQueryHandler
  implements IQueryHandler<UsersHasRoleOutboundQuery>
{
  constructor(private readonly repository: UsersHasRoleRepository) {}

  async execute({ input }: UsersHasRoleOutboundQuery) {
    return await this.repository.searchOut(input);
  }
}
