import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScopesRepository } from '../../../infrastructure/repositories/scopes.repository';
import { ScopeFindQuery } from '../impl/scope-find.query';

@QueryHandler(ScopeFindQuery)
export class ScopeFindQueryHandler implements IQueryHandler<ScopeFindQuery> {
  constructor(private readonly repository: ScopesRepository) {}

  async execute(query: ScopeFindQuery) {
    return await this.repository.find(query.input);
  }
}
