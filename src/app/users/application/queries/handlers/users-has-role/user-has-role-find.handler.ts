import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersHasRoleRepository } from 'src/app/users/infrastructure/repositories/users-has-role.repository';
import { UserHasRoleFindQuery } from '../../impl/users-has-role/user-has-role-find.query';

@QueryHandler(UserHasRoleFindQuery)
export class UserHasRoleFindQueryHandler
  implements IQueryHandler<UserHasRoleFindQuery>
{
  constructor(private readonly repository: UsersHasRoleRepository) {}

  async execute({ input }: UserHasRoleFindQuery) {
    return await this.repository.find(input);
  }
}
