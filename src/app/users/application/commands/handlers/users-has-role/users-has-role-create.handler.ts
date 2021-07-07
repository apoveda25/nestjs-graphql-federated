import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UsersHasRoleCreatedEvent } from '../../../../domain/events/users-has-role/users-has-role-created.event';
import { UsersHasRoleCreateCommand } from '../../impl/users-has-role/users-has-role-create.command';

@CommandHandler(UsersHasRoleCreateCommand)
export class UsersHasRoleCreateCommandHandler
  implements ICommandHandler<UsersHasRoleCreateCommand>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute({ input }: UsersHasRoleCreateCommand): Promise<boolean> {
    this.eventBus.publish(new UsersHasRoleCreatedEvent(input));

    return true;
  }
}
