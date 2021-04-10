import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../repositories/users.repository';
import { UsersSearchQuery } from '../impl/users-search.query';

@QueryHandler(UsersSearchQuery)
export class UsersSearchQueryHandler
  implements IQueryHandler<UsersSearchQuery> {
  constructor(private readonly repository: UsersRepository) {}

  async execute(query: UsersSearchQuery) {
    return await this.repository.search(query.input);
  }
}
