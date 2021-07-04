import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { Scope } from '../../../domain/entities/scope.entity';
import { ScopeCreatedEvent } from '../../../domain/events/scope-created.event';
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

  async execute({ input }: ScopesCreateCommand): Promise<Scope> {
    const conflictKeyName = await this.queryBus.execute(
      new ScopeFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _key: input._key, name: input.name },
          OperatorBoolean.OR,
        ),
      ),
    );

    const scopeCreated = this.scopeModel.create(input, {
      conflictKeyName,
    });

    this.eventBus.publish(new ScopeCreatedEvent(scopeCreated));

    return scopeCreated;
  }
}
