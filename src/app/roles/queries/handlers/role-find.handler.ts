import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesRepository } from '../../repositories/roles.repository';
import { RoleFindQuery } from '../impl/role-find.query';

@QueryHandler(RoleFindQuery)
export class RoleFindQueryHandler implements IQueryHandler<RoleFindQuery> {
  constructor(private readonly repository: RolesRepository) {}

  async execute(query: RoleFindQuery) {
    const document = await this.repository.findOr(query.input);

    if (document) return document;

    throw new NotFoundException();
  }
}
