import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../../infrastructure/repositories/users.repository';
import { UsersCountQuery } from '../impl/users-count.query';

@QueryHandler(UsersCountQuery)
export class UsersCountQueryHandler implements IQueryHandler<UsersCountQuery> {
  constructor(private readonly repository: UsersRepository) {}

  async execute({ filters }: UsersCountQuery): Promise<number> {
    return await this.repository.count({ filters });
  }
}
