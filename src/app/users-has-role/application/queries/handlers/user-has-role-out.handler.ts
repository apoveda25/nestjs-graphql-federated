import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersHasRoleRepository } from '../../../infrastructure/repositories/users-has-role.repository';
import { UserHasRoleOutQuery } from '../impl/user-has-role-out.query';

@QueryHandler(UserHasRoleOutQuery)
export class UserHasRoleOutQueryHandler
  implements IQueryHandler<UserHasRoleOutQuery> {
  constructor(private readonly repository: UsersHasRoleRepository) {}

  async execute(query: UserHasRoleOutQuery) {
    return await this.repository.findOut(query.input);
  }
}
