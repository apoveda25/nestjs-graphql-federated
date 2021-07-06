import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { IEdge } from 'src/shared/interfaces/edge.interface';
import { OperatorBoolean } from '../../../../../../shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../../shared/services/query-parse/query-parse.service';
import { ScopeFindQuery } from '../../../../../scopes/application/queries/impl/scope-find.query';
import { Scope } from '../../../../../scopes/domain/entities/scope.entity';
import { DeleteRoleHasScopeDto } from '../../../../domain/dto/roles-has-scope/delete-role-has-scope.dto';
import { RolesHasScopeDeletedEvent } from '../../../../domain/events/roles-has-scope/roles-has-scope-deleted.event';
import { RolesHasScopeModel } from '../../../../domain/models/roles-has-scope.model';
import { RoleHasScopeFindQuery } from '../../../queries/impl/roles-has-scope/role-has-scope-find.query';
import { RolesHasScopeDeleteCommand } from '../../impl/roles-has-scope/roles-has-scope-delete.command';

@CommandHandler(RolesHasScopeDeleteCommand)
export class RolesHasScopeDeleteCommandHandler
  implements ICommandHandler<RolesHasScopeDeleteCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly rolesHasScopeModel: RolesHasScopeModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({ input }: RolesHasScopeDeleteCommand): Promise<Scope[]> {
    const deletedRolesHasScopeDto: DeleteRoleHasScopeDto[] = [];
    const scopesRemovedToRole: Scope[] = [];

    for (const roleHasScope of input) {
      const conflictEdge = await this.rolesHasScopeFind(roleHasScope);

      const scopeRemovedToRole = await this.scopeFind(roleHasScope);

      const deletedRoleHasScopeDto = this.rolesHasScopeModel.deleteScopes(
        roleHasScope,
        { conflictEdge },
      );

      deletedRolesHasScopeDto.push(deletedRoleHasScopeDto);
      scopesRemovedToRole.push(scopeRemovedToRole);
    }

    this.eventBus.publish(
      new RolesHasScopeDeletedEvent(deletedRolesHasScopeDto),
    );

    return scopesRemovedToRole;
  }

  private async rolesHasScopeFind({
    _from,
    _to,
  }: DeleteRoleHasScopeDto): Promise<IEdge> {
    return await this.queryBus.execute(
      new RoleHasScopeFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _from, _to },
          OperatorBoolean.AND,
        ),
      ),
    );
  }

  private async scopeFind({ _to }: DeleteRoleHasScopeDto): Promise<Scope> {
    return await this.queryBus.execute(
      new ScopeFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _id: _to },
          OperatorBoolean.AND,
        ),
      ),
    );
  }
}
