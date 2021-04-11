import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesRepository } from '../../repositories/roles.repository';
import { RoleFindQuery } from '../impl/role-find.query';

@QueryHandler(RoleFindQuery)
export class RoleFindQueryHandler implements IQueryHandler<RoleFindQuery> {
  constructor(private readonly repository: RolesRepository) {}

  async execute(query: RoleFindQuery) {
    return await this.repository.findOr(query.input);
  }
}
