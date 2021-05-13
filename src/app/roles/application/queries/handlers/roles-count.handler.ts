import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesRepository } from '../../../infrastructure/repositories/roles.repository';
import { RolesCountQuery } from '../impl/roles-count.query';

@QueryHandler(RolesCountQuery)
export class RolesCountQueryHandler implements IQueryHandler<RolesCountQuery> {
  constructor(private readonly repository: RolesRepository) {}

  async execute({ filters }: RolesCountQuery): Promise<number> {
    return await this.repository.count({ filters });
  }
}
