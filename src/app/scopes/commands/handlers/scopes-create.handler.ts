import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DocumentCollection, EdgeCollection } from 'arangojs/collection';
import { v4 as uuidv4 } from 'uuid';
import { CreateScopeDto } from '../../dto/create-scope.dto';
import { Scope } from '../../entities/scope.entity';
import { ScopeCreateModel } from '../../models/scope-create.model';
import { ScopesRepository } from '../../repositories/scopes.repository';
import { SCOPES_ACTIONS } from '../../scopes.constant';
import { ScopesCreateCommand } from '../impl/scopes-create.command';

@CommandHandler(ScopesCreateCommand)
export class ScopesCreateCommandHandler
  implements ICommandHandler<ScopesCreateCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly scopesRepository: ScopesRepository,
  ) {}

  async execute(command: ScopesCreateCommand): Promise<Scope[]> {
    const results: Scope[] = [];
    const collections = await this.scopesRepository.getCollections();

    const createScopes = this.buildData(collections, command.createdBy);

    createScopes.map(async (scope) => {
      const { name } = scope;
      const scopeConflict = await this.scopesRepository.findOr({ name });

      const ScopeAggregate = this.publisher.mergeClassContext(ScopeCreateModel);
      const aggregate = new ScopeAggregate(scope);
      const scopeCreated = aggregate.create(scopeConflict);

      if (scopeCreated) aggregate.commit();

      if (scopeCreated) results.push(scope);
    });

    return results;
  }

  buildData(
    collections: (DocumentCollection<any> & EdgeCollection<any>)[],
    createdBy: string,
  ): CreateScopeDto[] {
    const createScopes: CreateScopeDto[] = [];

    collections.map((collection) => {
      SCOPES_ACTIONS.map((action) => {
        const _key = uuidv4();

        createScopes.push({
          _id: `Scopes/${_key}`,
          _key,
          name: `${collection.name.toLowerCase()}_${action.toLowerCase()}`,
          action,
          collection: collection.name,
          createdAt: Date.now(),
          updatedAt: 0,
          createdBy,
          updatedBy: '',
        });
      });
    });

    return createScopes;
  }
}
