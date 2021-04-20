import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { UpdateUserDto } from '../../../domain/dto/update-user.dto';
import { User } from '../../../domain/entities/user.entity';
import { UsersUpdatedEvent } from '../../../domain/events/users-updated.event';
import { UserModel } from '../../../domain/models/user.model';
import { UserFindQuery } from '../../queries/impl/user-find.query';
import { UsersUpdateCommand } from '../impl/users-update.command';

@CommandHandler(UsersUpdateCommand)
export class UsersUpdateCommandHandler
  implements ICommandHandler<UsersUpdateCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly userModel: UserModel,
  ) {}

  async execute({ users }: UsersUpdateCommand): Promise<UpdateUserDto[]> {
    const usersUpdated: User[] = [];

    for (const user of users) {
      const conflictKey = await this.queryBus.execute(
        new UserFindQuery({ _key: user._key }),
      );

      const conflictUsername = user.username
        ? await this.queryBus.execute(
            new UserFindQuery({ username: user.username }),
          )
        : null;

      const conflictEmail = user.email
        ? await this.queryBus.execute(new UserFindQuery({ email: user.email }))
        : null;

      const userUpdated = await this.userModel.update(user, {
        conflictKey,
        conflictUsername,
        conflictEmail,
      });

      usersUpdated.push(userUpdated);
    }

    this.eventBus.publish(new UsersUpdatedEvent(usersUpdated));

    return usersUpdated;
  }
}
