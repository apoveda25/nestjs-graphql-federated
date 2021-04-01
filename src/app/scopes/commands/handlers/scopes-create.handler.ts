import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
import { CreateScopeDto } from '../../dto/create-scope.dto';
import { Scope } from '../../entities/scope.entity';
import { ScopeCreatedEvent } from '../../events/impl/scope-created.event';
import { ICollection } from '../../interfaces/scopes-command-handlers.interface';
import { ScopeModel } from '../../models/scope.model';
import { ScopesRepository } from '../../repositories/scopes.repository';
import { SCOPES_ACTIONS } from '../../scopes.constant';
import { ScopesCreateCommand } from '../impl/scopes-create.command';

@CommandHandler(ScopesCreateCommand)
export class ScopesCreateCommandHandler
  implements ICommandHandler<ScopesCreateCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly scopesRepository: ScopesRepository,
    private readonly scopeModel: ScopeModel,
  ) {}

  async execute(command: ScopesCreateCommand): Promise<Scope[]> {
    const results: Scope[] = [];
    const collections = await this.scopesRepository.getCollections();
    const createScopes = this.buildData(collections, command.createdBy);

    for (const scope of createScopes) {
      const { _key, name } = scope;
      const scopeConflict: Scope = await this.scopesRepository.findOr({
        _key,
        name,
      });

      const scopeCreated = this.scopeModel.create(scope, scopeConflict);

      if (scopeCreated) results.push(scopeCreated);
    }

    results.map((result) =>
      this.eventBus.publish(new ScopeCreatedEvent(result)),
    );

    return results;
  }

  buildData(collections: ICollection[], createdBy: string): CreateScopeDto[] {
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
