import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersHasRoleRepository } from '../../repositories/users-has-role.repository';
import { UserHasRoleOutEdgeQuery } from '../impl/user-has-role-out-edge.query';

@QueryHandler(UserHasRoleOutEdgeQuery)
export class UserHasRoleOutEdgeQueryHandler
  implements IQueryHandler<UserHasRoleOutEdgeQuery> {
  constructor(private readonly repository: UsersHasRoleRepository) {}

  async execute(query: UserHasRoleOutEdgeQuery) {
    return await this.repository.findOutEdge(query.input);
  }
}
