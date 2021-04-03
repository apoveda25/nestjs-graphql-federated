import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Role } from '../../entities/role.entity';
import { RoleCreatedEvent } from '../../events/impl/role-created.event';
import { RoleModel } from '../../models/role.model';
import { RolesRepository } from '../../repositories/roles.repository';
import { RoleCreateCommand } from '../impl/role-create.command';

@CommandHandler(RoleCreateCommand)
export class RoleCreateCommandHandler
  implements ICommandHandler<RoleCreateCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly rolesRepository: RolesRepository,
    private readonly roleModel: RoleModel,
  ) {}

  async execute(command: RoleCreateCommand): Promise<Role> {
    const { _key, name } = command.role;
    const roleConflict: Role = await this.rolesRepository.findOr({
      _key,
      name,
    });
    const roleCreated = this.roleModel.create(command.role, roleConflict);

    this.eventBus.publish(new RoleCreatedEvent(roleCreated));

    return roleCreated;
  }
}
