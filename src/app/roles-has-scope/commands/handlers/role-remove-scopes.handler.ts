import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RoleRemovedScopesEvent } from '../../events/impl/role-removed-scopes.event';
import { RolesHasScopeModel } from '../../models/roles-has-scope.model';
import { RoleRemoveScopesCommand } from '../impl/role-remove-scopes.command';

@CommandHandler(RoleRemoveScopesCommand)
export class RoleRemoveScopesCommandHandler
  implements ICommandHandler<RoleRemoveScopesCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly rolesHasScopeModel: RolesHasScopeModel,
  ) {}

  async execute(command: RoleRemoveScopesCommand): Promise<boolean> {
    const removedScopesToRole = await this.rolesHasScopeModel.removeScopes(
      command.input,
    );

    this.eventBus.publish(new RoleRemovedScopesEvent(removedScopesToRole));

    return true;
  }
}
