import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
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
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute(command: SignUpAuthCommand): Promise<IPayload> {
    const conflictKeyUsernameEmail = await this.queryBus.execute<
      UserFindQuery,
      User
    >(
      new UserFindQuery(
        this.queryParseService.parseOneFilterByKey(
          {
            _key: command.payload._key,
            username: command.payload.username,
            email: command.payload.email,
          },
          OperatorBoolean.OR,
        ),
      ),
    );

    const conflictRole = await this.queryBus.execute<RoleFindQuery, Role>(
      new RoleFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { default: true },
          OperatorBoolean.AND,
        ),
      ),
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
