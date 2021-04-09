import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RolesRepository } from '../../../roles/repositories/roles.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserCreatedEvent } from '../../events/impl/user-created.event';
import { UserModel } from '../../models/user.model';
import { UsersRepository } from '../../repositories/users.repository';
import { UserCreateCommand } from '../impl/user-create.command';

@CommandHandler(UserCreateCommand)
export class UserCreateCommandHandler
  implements ICommandHandler<UserCreateCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
    private readonly userModel: UserModel,
  ) {}

  async execute(command: UserCreateCommand): Promise<CreateUserDto> {
    const { _key, username, email, roleId } = command.user;

    const withKey = await this.usersRepository.findOr({ _key });

    const withUsernameEmail = await this.usersRepository.findOr({
      username,
      email,
    });

    const withRoleId = await this.rolesRepository.findOr({ _id: roleId });

    const userCreated = this.userModel.create(command.user, {
      withKey,
      withUsernameEmail,
      withRoleId,
    });

    this.eventBus.publish(new UserCreatedEvent(userCreated));

    return userCreated;
  }
}
