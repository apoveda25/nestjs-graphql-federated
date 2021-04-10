import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../repositories/users.repository';
import { UsersCountQuery } from '../impl/users-count.query';

@QueryHandler(UsersCountQuery)
export class UsersCountQueryHandler implements IQueryHandler<UsersCountQuery> {
  constructor(private readonly repository: UsersRepository) {}

  async execute(query: UsersCountQuery): Promise<number> {
    return await this.repository.count(query.filters);
  }
}
