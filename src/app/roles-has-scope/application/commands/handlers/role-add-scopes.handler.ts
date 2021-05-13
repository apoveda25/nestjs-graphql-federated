import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { RoleFindQuery } from '../../../../roles/application/queries/impl/role-find.query';
import { ScopeFindQuery } from '../../../../scopes/application/queries/impl/scope-find.query';
import { AddScopesRoleDto } from '../../../domain/dto/add-scopes-role.dto';
import { RoleAddedScopesEvent } from '../../../domain/events/role-added-scopes.event';
import { RolesHasScopeModel } from '../../../domain/models/roles-has-scope.model';
import { RoleHasScopeFindQuery } from '../../queries/impl/role-has-scope-find.query';
import { RoleAddScopesCommand } from '../impl/role-add-scopes.command';

@CommandHandler(RoleAddScopesCommand)
export class RoleAddScopesCommandHandler
  implements ICommandHandler<RoleAddScopesCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly rolesHasScopeModel: RolesHasScopeModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({ roleHasScopes }: RoleAddScopesCommand): Promise<boolean> {
    const addedScopesToRole: AddScopesRoleDto[] = [];

    for (const roleHasScope of roleHasScopes) {
      const conflictEdge = await this.queryBus.execute(
        new RoleHasScopeFindQuery(
          this.queryParseService.parseOneFilterByKey(
            { ...roleHasScope },
            OperatorBoolean.AND,
          ),
        ),
      );

      const conflictFrom = await this.queryBus.execute(
        new RoleFindQuery(
          this.queryParseService.parseOneFilterByKey(
            { _id: roleHasScope._from },
            OperatorBoolean.AND,
          ),
        ),
      );

      const conflictTo = await this.queryBus.execute(
        new ScopeFindQuery(
          this.queryParseService.parseOneFilterByKey(
            { _id: roleHasScope._to },
            OperatorBoolean.AND,
          ),
        ),
      );

      const addedScopeToRole = await this.rolesHasScopeModel.addScopes(
        roleHasScope,
        { conflictEdge, conflictFrom, conflictTo },
      );

      addedScopesToRole.push(addedScopeToRole);
    }

    this.eventBus.publish(new RoleAddedScopesEvent(addedScopesToRole));

    return true;
  }
}
