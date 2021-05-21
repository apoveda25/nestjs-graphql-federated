import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { v4 as uuidv4 } from 'uuid';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { CreateScopeDto } from '../../../domain/dto/create-scope.dto';
import { Scope } from '../../../domain/entities/scope.entity';
import { ScopeCreatedEvent } from '../../../domain/events/scope-created.event';
import { ICollection } from '../../../domain/interfaces/scope.interfaces';
import { ScopeModel } from '../../../domain/models/scope.model';
import { ScopesRepository } from '../../../infrastructure/repositories/scopes.repository';
import { SCOPES_ACTIONS } from '../../../scopes.constant';
import { ScopeFindQuery } from '../../queries/impl/scope-find.query';
import { ScopesCreateCommand } from '../impl/scopes-create.command';

@CommandHandler(ScopesCreateCommand)
export class ScopesCreateCommandHandler
  implements ICommandHandler<ScopesCreateCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly scopesRepository: ScopesRepository,
    private readonly scopeModel: ScopeModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute(command: ScopesCreateCommand): Promise<Scope[]> {
    const collections = await this.scopesRepository.getCollections();
    const createScopes = this.buildData(collections, command.createdBy);

    const scopesCreated: Scope[] = [];

    for (const createScope of createScopes) {
      const conflictKeyName = await this.queryBus.execute(
        new ScopeFindQuery(
          this.queryParseService.parseOneFilterByKey(
            { _key: createScope._key, name: createScope.name },
            OperatorBoolean.OR,
          ),
        ),
      );

      const scopeCreated = await this.scopeModel.create(createScope, {
        conflictKeyName,
      });

      if (scopeCreated) scopesCreated.push(scopeCreated);
    }

    scopesCreated.map((result) =>
      this.eventBus.publish(new ScopeCreatedEvent(result)),
    );

    return scopesCreated;
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
          updatedAt: null,
          createdBy,
          updatedBy: '',
        });
      });
    });

    return createScopes;
  }
}
