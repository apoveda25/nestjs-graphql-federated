import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { Role } from '../../../domain/entities/role.entity';
import { RoleCreatedEvent } from '../../../domain/events/role-created.event';
import { RoleModel } from '../../../domain/models/role.model';
import { RoleFindQuery } from '../../queries/impl/role-find.query';
import { RoleCreateCommand } from '../impl/role-create.command';

@CommandHandler(RoleCreateCommand)
export class RoleCreateCommandHandler
  implements ICommandHandler<RoleCreateCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly roleModel: RoleModel,
  ) {}

  async execute({ role }: RoleCreateCommand): Promise<Role> {
    const conflictKeyName = await this.queryBus.execute<RoleFindQuery, Role>(
      new RoleFindQuery({ _key: role._key, name: role.name }),
    );

    const roleCreated = await this.roleModel.create(role, { conflictKeyName });

    this.eventBus.publish(new RoleCreatedEvent(roleCreated));

    return roleCreated;
  }
}
