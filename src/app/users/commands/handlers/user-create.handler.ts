import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserCreatedEvent } from '../../events/impl/user-created.event';
import { UserModel } from '../../models/user.model';
import { UserCreateCommand } from '../impl/user-create.command';

@CommandHandler(UserCreateCommand)
export class UserCreateCommandHandler
  implements ICommandHandler<UserCreateCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userModel: UserModel,
  ) {}

  async execute(command: UserCreateCommand): Promise<CreateUserDto> {
    const userCreated = await this.userModel.create(command.user);

    this.eventBus.publish(new UserCreatedEvent(userCreated));

    return userCreated;
  }
}
