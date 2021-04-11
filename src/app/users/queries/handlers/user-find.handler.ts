import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../repositories/users.repository';
import { UserFindQuery } from '../impl/user-find.query';

@QueryHandler(UserFindQuery)
export class UserFindQueryHandler implements IQueryHandler<UserFindQuery> {
  constructor(private readonly repository: UsersRepository) {}

  async execute(query: UserFindQuery) {
    return await this.repository.findOr(query.input);
  }
}
