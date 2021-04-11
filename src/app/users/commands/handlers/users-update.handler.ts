import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { UsersUpdatedEvent } from '../../events/impl/users-updated.event';
import { UserModel } from '../../models/user.model';
import { UsersUpdateCommand } from '../impl/users-update.command';

@CommandHandler(UsersUpdateCommand)
export class UsersUpdateCommandHandler
  implements ICommandHandler<UsersUpdateCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userModel: UserModel,
  ) {}

  async execute(command: UsersUpdateCommand): Promise<UpdateUserDto[]> {
    const usersUpdated = await this.userModel.update(command.users);

    this.eventBus.publish(new UsersUpdatedEvent(usersUpdated));

    return usersUpdated;
  }
}
