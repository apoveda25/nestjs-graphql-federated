import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { RoleFindQuery } from '../../../../roles/application/queries/impl/role-find.query';
import { Role } from '../../../../roles/domain/entities/role.entity';
import { UserFindQuery } from '../../../../users/application/queries/impl/user-find.query';
import { User } from '../../../../users/domain/entities/user.entity';
import { AuthSignUpEvent } from '../../../domain/events/auth-sign-up.event';
import { IPayload } from '../../../domain/interfaces/payload.interface';
import { AuthModel } from '../../../domain/models/auth.model';
import { SignUpAuthCommand } from '../impl/sign-up-auth.command';

@CommandHandler(SignUpAuthCommand)
export class SignUpAuthCommandHandler
  implements ICommandHandler<SignUpAuthCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly authModel: AuthModel,
  ) {}

  async execute(command: SignUpAuthCommand): Promise<IPayload> {
    const conflictKeyUsernameEmail = await this.queryBus.execute<
      UserFindQuery,
      User
    >(
      new UserFindQuery({
        _key: command.payload._key,
        username: command.payload.username,
        email: command.payload.email,
      }),
    );

    const conflictRole = await this.queryBus.execute<RoleFindQuery, Role>(
      new RoleFindQuery({ default: true }),
    );

    const userCreated = await this.authModel.signUp(
      command.payload,
      conflictKeyUsernameEmail,
      conflictRole,
    );

    this.eventBus.publish(new AuthSignUpEvent(userCreated));

    return { user: userCreated, token: '' };
  }
}
