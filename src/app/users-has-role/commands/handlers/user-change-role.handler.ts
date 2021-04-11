import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserChangedRoleEvent } from '../../events/impl/user-changed-role.event';
import { UsersHasRoleModel } from '../../models/users-has-role.model';
import { UserChangeRoleCommand } from '../impl/user-change-role.command';

@CommandHandler(UserChangeRoleCommand)
export class UserChangeRoleCommandHandler
  implements ICommandHandler<UserChangeRoleCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly usersHasRoleModel: UsersHasRoleModel,
  ) {}

  async execute(command: UserChangeRoleCommand): Promise<boolean> {
    const userChangedRole = await this.usersHasRoleModel.update(command.input);

    this.eventBus.publish(new UserChangedRoleEvent(userChangedRole));

    return true;
  }
}
