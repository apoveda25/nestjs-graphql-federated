import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserHasRoleCreatedEvent } from '../../../../domain/events/users-has-role/user-has-role-created.event';
import { UserHasRoleCreateCommand } from '../../impl/users-has-role/user-has-role-create.command';

@CommandHandler(UserHasRoleCreateCommand)
export class UserHasRoleCreateCommandHandler
  implements ICommandHandler<UserHasRoleCreateCommand>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute({ input }: UserHasRoleCreateCommand): Promise<boolean> {
    this.eventBus.publish(new UserHasRoleCreatedEvent(input));

    return true;
  }
}
