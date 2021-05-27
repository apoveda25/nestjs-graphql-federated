import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
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
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({ user, context }: UserCreateCommand): Promise<CreateUserDto> {
    const conflictKeyUsernameEmail = await this.queryBus.execute(
      new UserFindQuery(
        this.queryParseService.parseOneFilterByKey(
          {
            _key: user._key,
            username: user.username,
            email: user.email,
          },
          OperatorBoolean.OR,
        ),
      ),
    );

    const conflictRoleId = await this.queryBus.execute(
      new RoleFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _id: user.roleId },
          OperatorBoolean.AND,
        ),
      ),
    );

    const userCreated = await this.userModel.create(
      user,
      {
        conflictKeyUsernameEmail,
        conflictRoleId,
      },
      context,
    );

    this.eventBus.publish(new UserCreatedEvent(userCreated));

    return userCreated;
  }
}
