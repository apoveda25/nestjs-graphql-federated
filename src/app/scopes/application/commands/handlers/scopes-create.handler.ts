import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { Scope } from 'src/app/scopes/domain/entities/scope.entity';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { CreateScopeDto } from '../../../domain/dto/create-scope.dto';
import { ScopesCreatedEvent } from '../../../domain/events/scopes-created.event';
import { ScopeModel } from '../../../domain/models/scope.model';
import { ScopeFindQuery } from '../../queries/impl/scope-find.query';
import { ScopesCreateCommand } from '../impl/scopes-create.command';

@CommandHandler(ScopesCreateCommand)
export class ScopesCreateCommandHandler
  implements ICommandHandler<ScopesCreateCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly scopeModel: ScopeModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({ input }: ScopesCreateCommand): Promise<CreateScopeDto[]> {
    const scopesCreated: CreateScopeDto[] = [];

    for (const scope of input) {
      const conflictKeyName = await this.scopeFind(scope);

      const scopeCreated = this.scopeModel.create(scope, {
        conflictKeyName,
      });

      scopesCreated.push(scopeCreated);
    }

    this.eventBus.publish(new ScopesCreatedEvent(scopesCreated));

    return scopesCreated;
  }

  private async scopeFind({ _key, name }: CreateScopeDto): Promise<Scope> {
    return await this.queryBus.execute(
      new ScopeFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _key, name },
          OperatorBoolean.OR,
        ),
      ),
    );
  }
}
