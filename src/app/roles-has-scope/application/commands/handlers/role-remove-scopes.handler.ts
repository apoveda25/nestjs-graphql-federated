import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { RemoveScopesRoleDto } from '../../../domain/dto/remove-scopes-role.dto';
import { RoleRemovedScopesEvent } from '../../../domain/events/role-removed-scopes.event';
import { RolesHasScopeModel } from '../../../domain/models/roles-has-scope.model';
import { RoleHasScopeFindQuery } from '../../queries/impl/role-has-scope-find.query';
import { RoleRemoveScopesCommand } from '../impl/role-remove-scopes.command';

@CommandHandler(RoleRemoveScopesCommand)
export class RoleRemoveScopesCommandHandler
  implements ICommandHandler<RoleRemoveScopesCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly rolesHasScopeModel: RolesHasScopeModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({ roleHasScopes }: RoleRemoveScopesCommand): Promise<boolean> {
    const removedScopesToRole: RemoveScopesRoleDto[] = [];

    for (const roleHasScope of roleHasScopes) {
      const conflictEdge = await this.queryBus.execute(
        new RoleHasScopeFindQuery(
          this.queryParseService.parseOneFilterByKey(
            { ...roleHasScope },
            OperatorBoolean.AND,
          ),
        ),
      );

      const removedScopeToRole = await this.rolesHasScopeModel.removeScopes(
        roleHasScope,
        { conflictEdge },
      );

      removedScopesToRole.push(removedScopeToRole);
    }

    this.eventBus.publish(new RoleRemovedScopesEvent(removedScopesToRole));

    return true;
  }
}
