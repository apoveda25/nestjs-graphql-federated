import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesRepository } from '../../repositories/roles.repository';
import { RolesSearchQuery } from '../impl/roles-search.query';

@QueryHandler(RolesSearchQuery)
export class RolesSearchQueryHandler
  implements IQueryHandler<RolesSearchQuery> {
  constructor(private readonly repository: RolesRepository) {}

  async execute(query: RolesSearchQuery) {
    return await this.repository.search(query.input);
  }
}
