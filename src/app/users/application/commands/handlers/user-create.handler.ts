import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { RoleFindQuery } from '../../../../roles/application/queries/impl/role-find.query';
import { CreateUserDto } from '../../../domain/dto/create-user.dto';
import { UserCreatedEvent } from '../../../domain/events/user-created.event';
import { UserModel } from '../../../domain/models/user.model';
import { UserFindQuery } from '../../queries/impl/user-find.query';
import { UserCreateCommand } from '../impl/user-create.command';

@CommandHandler(UserCreateCommand)
export class UserCreateCommandHandler
  implements ICommandHandler<UserCreateCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly userModel: UserModel,
  ) {}

  async execute({ user }: UserCreateCommand): Promise<CreateUserDto> {
    const conflictKeyUsernameEmail = await this.queryBus.execute(
      new UserFindQuery({
        _key: user._key,
        username: user.username,
        email: user.email,
      }),
    );

    const conflictRoleId = await this.queryBus.execute(
      new RoleFindQuery({ _id: user.roleId }),
    );

    const userCreated = await this.userModel.create(user, {
      conflictKeyUsernameEmail,
      conflictRoleId,
    });

    this.eventBus.publish(new UserCreatedEvent(userCreated));

    return userCreated;
  }
}
