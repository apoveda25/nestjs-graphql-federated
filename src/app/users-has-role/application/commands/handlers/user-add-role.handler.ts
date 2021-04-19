import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserAddedRoleEvent } from '../../../domain/events/user-added-role.event';
import { UserAddRoleCommand } from '../impl/user-add-role.command';

@CommandHandler(UserAddRoleCommand)
export class UserAddRoleCommandHandler
  implements ICommandHandler<UserAddRoleCommand> {
  constructor(private readonly eventBus: EventBus) {}

  async execute({ userHasRole }: UserAddRoleCommand): Promise<boolean> {
    this.eventBus.publish(new UserAddedRoleEvent(userHasRole));

    return true;
  }
}
