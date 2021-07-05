import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { collectionsEnum } from '../../../../../shared/enums/collections.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { DeleteScopeDto } from '../../../domain/dto/delete-scope.dto';
import { ScopesDeletedEvent } from '../../../domain/events/scopes-deleted.event';
import { ScopeModel } from '../../../domain/models/scope.model';
import { ScopesRepository } from '../../../infrastructure/repositories/scopes.repository';
import { ScopeFindQuery } from '../../queries/impl/scope-find.query';
import { ScopesDeleteCommand } from '../impl/scopes-delete.command';

@CommandHandler(ScopesDeleteCommand)
export class ScopesDeleteCommandHandler
  implements ICommandHandler<ScopesDeleteCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly scopeModel: ScopeModel,
    private readonly queryParseService: QueryParseService,
    private readonly scopesRepository: ScopesRepository,
  ) {}

  async execute({ input }: ScopesDeleteCommand): Promise<DeleteScopeDto[]> {
    const scopesDeleted: DeleteScopeDto[] = await this.validate(input);

    this.eventBus.publish(new ScopesDeletedEvent(scopesDeleted));

    return scopesDeleted;
  }

  private async validate(input: DeleteScopeDto[]): Promise<DeleteScopeDto[]> {
    const scopesDeleted: DeleteScopeDto[] = [];

    for (const scope of input) {
      const conflictKey = await this.queryBus.execute(
        new ScopeFindQuery(
          this.queryParseService.parseOneFilterByKey(
            { _key: scope._key },
            OperatorBoolean.OR,
          ),
        ),
      );

      const conflictInEdges = await this.scopesRepository.inEdges(scope._id, [
        collectionsEnum.ROLES_HAS_SCOPE,
      ]);

      const scopeDeleted = this.scopeModel.delete(scope, {
        conflictKey,
        conflictInEdges,
      });

      scopesDeleted.push(scopeDeleted);
    }

    return scopesDeleted;
  }
}
