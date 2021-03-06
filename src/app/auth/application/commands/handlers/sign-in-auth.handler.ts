import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { UserFindQuery } from '../../../../users/application/queries/impl/user-find.query';
import { User } from '../../../../users/domain/entities/user.entity';
import { SignInAuthDto } from '../../../domain/dto/sign-in-auth.dto';
import { IPayload } from '../../../domain/interfaces/payload.interface';
import { AuthModel } from '../../../domain/models/auth.model';
import { SignInAuthCommand } from '../impl/sign-in-auth.command';

@CommandHandler(SignInAuthCommand)
export class SignInAuthCommandHandler
  implements ICommandHandler<SignInAuthCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly authModel: AuthModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({ payload }: SignInAuthCommand): Promise<IPayload> {
    const conflictUsernameEmail = await this.userFind(payload);

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

  private async userFind({ usernameOrEmail }: SignInAuthDto): Promise<User> {
    return this.queryBus.execute(
      new UserFindQuery(
        this.queryParseService.parseOneFilterByKey(
          {
            username: usernameOrEmail,
            email: usernameOrEmail,
          },
          OperatorBoolean.OR,
        ),
      ),
    );
  }
}
