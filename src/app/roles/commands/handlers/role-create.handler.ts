import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Role } from '../../entities/role.entity';
import { RoleCreatedEvent } from '../../events/impl/role-created.event';
import { RoleModel } from '../../models/role.model';
import { RoleCreateCommand } from '../impl/role-create.command';

@CommandHandler(RoleCreateCommand)
export class RoleCreateCommandHandler
  implements ICommandHandler<RoleCreateCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly roleModel: RoleModel,
  ) {}

  async execute(command: RoleCreateCommand): Promise<Role> {
    const roleCreated = await this.roleModel.create(command.role);

    this.eventBus.publish(new RoleCreatedEvent(roleCreated));

    return roleCreated;
  }
}
