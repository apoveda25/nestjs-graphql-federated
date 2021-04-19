import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { RoleFindQuery } from '../../../../roles/application/queries/impl/role-find.query';
import { ScopeFindQuery } from '../../../../scopes/application/queries/impl/scope-find.query';
import { AddScopesRoleDto } from '../../../domain/dto/add-scopes-role.dto';
import { RoleAddedScopesEvent } from '../../../domain/events/role-added-scopes.event';
import { RolesHasScopeModel } from '../../../domain/models/roles-has-scope.model';
import { RoleHasScopeFindAndQuery } from '../../queries/impl/role-has-scope-find-and.query';
import { RoleAddScopesCommand } from '../impl/role-add-scopes.command';

@CommandHandler(RoleAddScopesCommand)
export class RoleAddScopesCommandHandler
  implements ICommandHandler<RoleAddScopesCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly rolesHasScopeModel: RolesHasScopeModel,
  ) {}

  async execute({ roleHasScopes }: RoleAddScopesCommand): Promise<boolean> {
    const addedScopesToRole: AddScopesRoleDto[] = [];

    for (const roleHasScope of roleHasScopes) {
      const conflictEdge = await this.queryBus.execute(
        new RoleHasScopeFindAndQuery({
          _from: roleHasScope._from,
          _to: roleHasScope._to,
        }),
      );

      const conflictFrom = await this.queryBus.execute(
        new RoleFindQuery({ _id: roleHasScope._from }),
      );

      const conflictTo = await this.queryBus.execute(
        new ScopeFindQuery({ _id: roleHasScope._to }),
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
