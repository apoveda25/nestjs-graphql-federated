import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RoleAddedScopesEvent } from '../../events/impl/role-added-scopes.event';
import { RoleModel } from '../../models/role.model';
import { RoleAddScopesCommand } from '../impl/role-add-scopes.command';

@CommandHandler(RoleAddScopesCommand)
export class RoleAddScopesCommandHandler
  implements ICommandHandler<RoleAddScopesCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly roleModel: RoleModel,
  ) {}

  async execute(command: RoleAddScopesCommand): Promise<boolean> {
    const addedScopesToRole = await this.roleModel.addScopes(command.input);

    this.eventBus.publish(new RoleAddedScopesEvent(addedScopesToRole));

    return true;
  }
}
