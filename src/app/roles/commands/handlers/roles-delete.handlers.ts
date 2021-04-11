import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Role } from '../../entities/role.entity';
import { RolesDeletedEvent } from '../../events/impl/roles-deleted.event';
import { RoleModel } from '../../models/role.model';
import { RolesDeleteCommand } from '../impl/roles-delete.command';

@CommandHandler(RolesDeleteCommand)
export class RolesDeleteCommandHandlers
  implements ICommandHandler<RolesDeleteCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly roleModel: RoleModel,
  ) {}

  async execute(command: RolesDeleteCommand): Promise<Role[]> {
    const rolesDeleted = await this.roleModel.delete(command.roles);

    this.eventBus.publish(new RolesDeletedEvent(rolesDeleted));

    return rolesDeleted;
  }
}
