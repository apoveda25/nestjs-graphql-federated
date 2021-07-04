import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { v4 as uuidv4 } from 'uuid';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { SCOPES_ACTIONS } from '../../../domain/constants/scopes.constant';
import { CreateScopeDto } from '../../../domain/dto/create-scope.dto';
import { InitScopeDto } from '../../../domain/dto/init-scope.dto';
import { ScopeCreatedEvent } from '../../../domain/events/scope-created.event';
import { ICollection } from '../../../domain/interfaces/scope.interfaces';
import { ScopeModel } from '../../../domain/models/scope.model';
import { ScopesRepository } from '../../../infrastructure/repositories/scopes.repository';
import { ScopeFindQuery } from '../../queries/impl/scope-find.query';
import { ScopesInitCommand } from '../impl/scopes-init.command';

@CommandHandler(ScopesInitCommand)
export class ScopesInitCommandHandler
  implements ICommandHandler<ScopesInitCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly scopesRepository: ScopesRepository,
    private readonly scopeModel: ScopeModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute(command: ScopesInitCommand): Promise<CreateScopeDto[]> {
    const collections = await this.scopesRepository.getCollections();
    const createScopes = this.buildData(collections, command.createdBy);

    const scopesCreated: CreateScopeDto[] = [];

    for (const createScope of createScopes) {
      const conflictKeyName = await this.queryBus.execute(
        new ScopeFindQuery(
          this.queryParseService.parseOneFilterByKey(
            { _key: createScope._key, name: createScope.name },
            OperatorBoolean.OR,
          ),
        ),
      );

      const scopeCreated = this.scopeModel.create(createScope, {
        conflictKeyName,
      });

      scopesCreated.push(scopeCreated);
    }

    scopesCreated.map((result) =>
      this.eventBus.publish(new ScopeCreatedEvent(result)),
    );

    return scopesCreated;
  }

  buildData(collections: ICollection[], createdBy: string): InitScopeDto[] {
    const createScopes: InitScopeDto[] = [];

    collections.map((collection) => {
      SCOPES_ACTIONS[collection.type].map((action) => {
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
          updatedBy: null,
        });
      });
    });

    return createScopes;
  }
}
