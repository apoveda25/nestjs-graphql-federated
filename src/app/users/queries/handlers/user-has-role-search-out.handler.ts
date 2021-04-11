import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersHasRoleRepository } from '../../repositories/users-has-role.repository';
import { UserHasRoleSearchOutQuery } from '../impl/user-has-role-search-out.query';

@QueryHandler(UserHasRoleSearchOutQuery)
export class UserHasRoleSearchOutQueryHandler
  implements IQueryHandler<UserHasRoleSearchOutQuery> {
  constructor(private readonly repository: UsersHasRoleRepository) {}

  async execute(query: UserHasRoleSearchOutQuery) {
    return await this.repository.findOut(query.input);
  }
}
