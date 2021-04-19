import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { User } from '../../../../users/entities/user.entity';
import { UserFindQuery } from '../../../../users/queries/impl/user-find.query';
import { IPayload } from '../../../domain/interfaces/payload.interface';
import { AuthModel } from '../../../domain/models/auth.model';
import { SignInAuthCommand } from '../impl/sign-in-auth.command';

@CommandHandler(SignInAuthCommand)
export class SignInAuthCommandHandler
  implements ICommandHandler<SignInAuthCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly authModel: AuthModel,
  ) {}

  async execute({ payload }: SignInAuthCommand): Promise<IPayload> {
    const conflictUsernameEmail = await this.queryBus.execute<
      UserFindQuery,
      User
    >(
      new UserFindQuery({
        username: payload.usernameOrEmail,
        email: payload.usernameOrEmail,
      }),
    );

    const userValidated = await this.authModel.signIn(
      payload,
      conflictUsernameEmail,
    );

    // this.eventBus.publish(new AuthSignInEvent(userCreated));

    return {
      user: userValidated,
      token: JSON.stringify({ sub: userValidated._id }),
    };
  }
}
