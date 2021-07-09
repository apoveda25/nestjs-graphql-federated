import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { Edge } from 'arangojs/documents';
import { UsersHasRoleModel } from 'src/app/users/domain/models/users-has-role.model';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from 'src/shared/services/query-parse/query-parse.service';
import { RoleFindQuery } from '../../../../../roles/application/queries/impl/role-find.query';
import { Role } from '../../../../../roles/domain/entities/role.entity';
import { UserHasRoleUpdateDto } from '../../../../domain/dto/users-has-role/user-has-role-update.dto';
import { User } from '../../../../domain/entities/user.entity';
import { UserHasRoleUpdatedEvent } from '../../../../domain/events/users-has-role/user-has-role-updated.event';
import { UserFindQuery } from '../../../queries/impl/user-find.query';
import { UserHasRoleFindQuery } from '../../../queries/impl/users-has-role/user-has-role-find.query';
import { UserHasRoleUpdateCommand } from '../../impl/users-has-role/user-has-role-update.command';

@CommandHandler(UserHasRoleUpdateCommand)
export class UserHasRoleUpdateCommandHandler
  implements ICommandHandler<UserHasRoleUpdateCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly usersHasRoleModel: UsersHasRoleModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({ input, context }: UserHasRoleUpdateCommand): Promise<Role> {
    const conflictFrom = await this.userFind(input);

    const conflictTo = await this.roleFind(input);

    const conflictEdge = await this.userHasRoleFind(input);

    const usersHasRoleUpdated = this.usersHasRoleModel.update(
      input,
      {
        conflictFrom,
        conflictTo,
        conflictEdge,
      },
      context,
    );

    this.eventBus.publish(new UserHasRoleUpdatedEvent(usersHasRoleUpdated));

    return conflictTo;
  }

  private async userFind({ _from }: UserHasRoleUpdateDto): Promise<User> {
    return this.queryBus.execute(
      new UserFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _id: _from },
          OperatorBoolean.AND,
        ),
      ),
    );
  }

  private async roleFind({ _to }: UserHasRoleUpdateDto): Promise<Role> {
    return this.queryBus.execute(
      new RoleFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _id: _to },
          OperatorBoolean.AND,
        ),
      ),
    );
  }

  private async userHasRoleFind({
    _from,
  }: UserHasRoleUpdateDto): Promise<Edge> {
    return this.queryBus.execute(
      new UserHasRoleFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _from },
          OperatorBoolean.AND,
        ),
      ),
    );
  }
}
