import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Role } from '../../entities/role.entity';
import { RolesUpdatedEvent } from '../../events/impl/roles-updated.event';
import { RoleModel } from '../../models/role.model';
import { RolesRepository } from '../../repositories/roles.repository';
import { RolesUpdateCommand } from '../impl/roles-update.command';

@CommandHandler(RolesUpdateCommand)
export class RolesUpdateCommandHandlers
  implements ICommandHandler<RolesUpdateCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly rolesRepository: RolesRepository,
    private readonly roleModel: RoleModel,
  ) {}

  async execute(command: RolesUpdateCommand): Promise<Role[]> {
    const rolesUpdated: Role[] = [];

    for (const role of command.roles) {
      const { _key, name } = role;

      const roleConflictKey = await this.rolesRepository.findOr({ _key });

      const roleConflictName = name
        ? await this.rolesRepository.findOr({ name })
        : null;

      const roleConflictDefault = role.default
        ? await this.rolesRepository.findOr({ default: role.default })
        : null;

      const roleUpdated = this.roleModel.update(role, {
        withKey: roleConflictKey,
        withName: roleConflictName,
        withDefault: roleConflictDefault,
      });

      rolesUpdated.push(roleUpdated);
    }

    this.eventBus.publish(new RolesUpdatedEvent(rolesUpdated));

    return rolesUpdated;
  }
}
