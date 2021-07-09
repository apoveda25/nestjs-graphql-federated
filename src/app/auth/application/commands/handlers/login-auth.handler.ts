import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { Role } from '../../../../roles/domain/entities/role.entity';
import { UserFindQuery } from '../../../../users/application/queries/impl/user-find.query';
import { UsersHasRoleOutboundQuery } from '../../../../users/application/queries/impl/users-has-role/users-has-role-outbound.query';
import { User } from '../../../../users/domain/entities/user.entity';
import { SignInAuthDto } from '../../../domain/dto/sign-in-auth.dto';
import { IPayload } from '../../../domain/interfaces/payload.interface';
import { AuthModel } from '../../../domain/models/auth.model';
import { LoginAuthCommand } from '../impl/login-auth.command';

@CommandHandler(LoginAuthCommand)
export class LoginAuthCommandHandler
  implements ICommandHandler<LoginAuthCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly authModel: AuthModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({ payload }: LoginAuthCommand): Promise<IPayload> {
    const conflictUsernameEmail = await this.userFind(payload);

    const conflictRole = await this.usersHasRoleOutbound(conflictUsernameEmail);

    const userValidated = await this.authModel.login(payload, {
      conflictUsernameEmail,
      conflictRole,
    });

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

  private async usersHasRoleOutbound({ _id }: User): Promise<Role> {
    return this.queryBus.execute(
      new UsersHasRoleOutboundQuery({
        parentId: _id ?? '',
      }),
    );
  }
}
