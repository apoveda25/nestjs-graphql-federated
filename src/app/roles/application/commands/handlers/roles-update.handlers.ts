import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { Role } from '../../../domain/entities/role.entity';
import { RolesUpdatedEvent } from '../../../domain/events/roles-updated.event';
import { RoleModel } from '../../../domain/models/role.model';
import { RoleFindQuery } from '../../queries/impl/role-find.query';
import { RolesUpdateCommand } from '../impl/roles-update.command';

@CommandHandler(RolesUpdateCommand)
export class RolesUpdateCommandHandlers
  implements ICommandHandler<RolesUpdateCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly roleModel: RoleModel,
  ) {}

  async execute({ roles }: RolesUpdateCommand): Promise<Role[]> {
    const rolesUpdated: Role[] = [];

    for (const role of roles) {
      const conflictKey = await this.queryBus.execute(
        new RoleFindQuery({ _key: role._key }),
      );

      const conflictName = role.name
        ? await this.queryBus.execute(new RoleFindQuery({ name: role.name }))
        : null;

      const conflictDefault = role.default
        ? await this.queryBus.execute(
            new RoleFindQuery({ default: role.default }),
          )
        : null;

      const roleUpdated = await this.roleModel.update(role, {
        conflictKey,
        conflictName,
        conflictDefault,
      });

      rolesUpdated.push({ ...roleUpdated });
    }

    this.eventBus.publish(new RolesUpdatedEvent(rolesUpdated));

    return rolesUpdated;
  }
}
