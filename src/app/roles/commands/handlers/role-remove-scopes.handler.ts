import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RemoveScopesRoleDto } from '../../dto/remove-scopes-role.dto';
import { RoleRemovedScopesEvent } from '../../events/impl/role-removed-scopes.event';
import { RoleModel } from '../../models/role.model';
import { RolesHasScopeRepository } from '../../repositories/roles-has-scope.repository';
import { RoleRemoveScopesCommand } from '../impl/role-remove-scopes.command';

@CommandHandler(RoleRemoveScopesCommand)
export class RoleRemoveScopesCommandHandler
  implements ICommandHandler<RoleRemoveScopesCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly rolesHasScopeRepository: RolesHasScopeRepository,
    private readonly roleModel: RoleModel,
  ) {}

  async execute(command: RoleRemoveScopesCommand): Promise<boolean> {
    const removeScopes: RemoveScopesRoleDto[] = [];

    for (const edge of command.input) {
      const { _from, _to } = edge;
      const withFromTo = await this.rolesHasScopeRepository.findAnd({
        _from,
        _to,
      });

      const roleRemoveScope = this.roleModel.removeScope(edge, { withFromTo });

      removeScopes.push(roleRemoveScope);
    }

    this.eventBus.publish(new RoleRemovedScopesEvent(removeScopes));

    return true;
  }
}
