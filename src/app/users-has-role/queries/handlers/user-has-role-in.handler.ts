import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersHasRoleRepository } from '../../repositories/users-has-role.repository';
import { UserHasRoleInQuery } from '../impl/user-has-role-in.query';

@QueryHandler(UserHasRoleInQuery)
export class UserHasRoleInQueryHandler
  implements IQueryHandler<UserHasRoleInQuery> {
  constructor(private readonly repository: UsersHasRoleRepository) {}

  async execute(query: UserHasRoleInQuery) {
    return await this.repository.searchIn(query.input);
  }
}
