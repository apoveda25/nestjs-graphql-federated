import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserAddedRoleEvent } from '../../events/impl/user-added-role.event';
import { UserAddRoleCommand } from '../impl/user-add-role.command';

@CommandHandler(UserAddRoleCommand)
export class UserAddRoleCommandHandler
  implements ICommandHandler<UserAddRoleCommand> {
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: UserAddRoleCommand): Promise<boolean> {
    this.eventBus.publish(new UserAddedRoleEvent(command.input));

    return true;
  }
}
