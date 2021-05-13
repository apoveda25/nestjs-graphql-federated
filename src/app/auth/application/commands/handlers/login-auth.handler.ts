import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { UserHasRoleOutQuery } from 'src/app/users-has-role/application/queries/impl/user-has-role-out.query';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { Role } from '../../../../roles/domain/entities/role.entity';
import { UserFindQuery } from '../../../../users/application/queries/impl/user-find.query';
import { User } from '../../../../users/domain/entities/user.entity';
import { IPayload } from '../../../domain/interfaces/payload.interface';
import { AuthModel } from '../../../domain/models/auth.model';
import { LoginAuthCommand } from '../impl/login-auth.command';

@CommandHandler(LoginAuthCommand)
export class LoginAuthCommandHandler
  implements ICommandHandler<LoginAuthCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly authModel: AuthModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({ payload }: LoginAuthCommand): Promise<IPayload> {
    const conflictUsernameEmail = await this.queryBus.execute<
      UserFindQuery,
      User
    >(
      new UserFindQuery(
        this.queryParseService.parseOneFilterByKey(
          {
            username: payload.usernameOrEmail,
            email: payload.usernameOrEmail,
          },
          OperatorBoolean.OR,
        ),
      ),
    );

    const conflictRole = await this.queryBus.execute<UserHasRoleOutQuery, Role>(
      new UserHasRoleOutQuery({
        parentId: conflictUsernameEmail._id ?? '',
      }),
    );

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
}
