import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { RoleHasScopeInboundQuery } from '../../../../roles/application/queries/impl/roles-has-scope/role-has-scope-inbound.query';
import { Role } from '../../../../roles/domain/entities/role.entity';
import { DeleteScopeDto } from '../../../domain/dto/delete-scope.dto';
import { Scope } from '../../../domain/entities/scope.entity';
import { ScopesDeletedEvent } from '../../../domain/events/scopes-deleted.event';
import { ScopeModel } from '../../../domain/models/scope.model';
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
  ) {}

  async execute({ input }: ScopesDeleteCommand): Promise<DeleteScopeDto[]> {
    const scopesDeleted: DeleteScopeDto[] = [];

    for (const scope of input) {
      const conflictKey = await this.scopeFind(scope);

      const conflictInEdgesRoles = await this.roleHasScopeInbound(scope);

      const scopeDeleted = this.scopeModel.delete(scope, {
        conflictKey,
        conflictInEdgesRoles,
      });

      scopesDeleted.push(scopeDeleted);
    }

    this.eventBus.publish(new ScopesDeletedEvent(scopesDeleted));

    return scopesDeleted;
  }

  private async scopeFind({ _key }: DeleteScopeDto): Promise<Scope> {
    return await this.queryBus.execute(
      new ScopeFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _key },
          OperatorBoolean.OR,
        ),
      ),
    );
  }

  private async roleHasScopeInbound({ _id }: DeleteScopeDto): Promise<Role[]> {
    return await this.queryBus.execute(
      new RoleHasScopeInboundQuery({ parentId: _id }),
    );
  }
}
