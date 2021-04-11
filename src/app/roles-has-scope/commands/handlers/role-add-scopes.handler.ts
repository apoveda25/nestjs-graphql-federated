import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RoleAddedScopesEvent } from '../../events/impl/role-added-scopes.event';
import { RolesHasScopeModel } from '../../models/roles-has-scope.model';
import { RoleAddScopesCommand } from '../impl/role-add-scopes.command';

@CommandHandler(RoleAddScopesCommand)
export class RoleAddScopesCommandHandler
  implements ICommandHandler<RoleAddScopesCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly rolesHasScopeModel: RolesHasScopeModel,
  ) {}

  async execute(command: RoleAddScopesCommand): Promise<boolean> {
    const addedScopesToRole = await this.rolesHasScopeModel.addScopes(
      command.input,
    );

    this.eventBus.publish(new RoleAddedScopesEvent(addedScopesToRole));

    return true;
  }
}
