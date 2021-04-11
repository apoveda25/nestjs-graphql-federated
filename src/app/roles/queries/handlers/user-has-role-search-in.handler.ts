import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersHasRoleRepository } from '../../repositories/users-has-role.repository';
import { UserHasRoleSearchInQuery } from '../impl/user-has-role-search-in.query';

@QueryHandler(UserHasRoleSearchInQuery)
export class UserHasRoleSearchInQueryHandler
  implements IQueryHandler<UserHasRoleSearchInQuery> {
  constructor(private readonly repository: UsersHasRoleRepository) {}

  async execute(query: UserHasRoleSearchInQuery) {
    return await this.repository.searchIn(query.input);
  }
}
