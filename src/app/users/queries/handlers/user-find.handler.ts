import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../repositories/users.repository';
import { UserFindQuery } from '../impl/user-find.query';

@QueryHandler(UserFindQuery)
export class UserFindQueryHandler implements IQueryHandler<UserFindQuery> {
  constructor(private readonly repository: UsersRepository) {}

  async execute(query: UserFindQuery) {
    const document = await this.repository.findOr(query.input);

    if (document) return document;

    throw new NotFoundException();
  }
}
