import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Role } from '../../entities/role.entity';
import { RolesUpdatedEvent } from '../../events/impl/roles-updated.event';
import { RoleModel } from '../../models/role.model';
import { RolesUpdateCommand } from '../impl/roles-update.command';

@CommandHandler(RolesUpdateCommand)
export class RolesUpdateCommandHandlers
  implements ICommandHandler<RolesUpdateCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly roleModel: RoleModel,
  ) {}

  async execute(command: RolesUpdateCommand): Promise<Role[]> {
    const rolesUpdated = await this.roleModel.update(command.roles);

    this.eventBus.publish(new RolesUpdatedEvent(rolesUpdated));

    return rolesUpdated;
  }
}
