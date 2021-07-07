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
import { UsersHasRoleUpdatedEvent } from '../../../../domain/events/users-has-role/users-has-role-updated.event';
import { UserFindQuery } from '../../../queries/impl/user-find.query';
import { UserHasRoleFindQuery } from '../../../queries/impl/users-has-role/user-has-role-find.query';
import { UsersHasRoleUpdateCommand } from '../../impl/users-has-role/users-has-role-update.command';

@CommandHandler(UsersHasRoleUpdateCommand)
export class UsersHasRoleUpdateCommandHandler
  implements ICommandHandler<UsersHasRoleUpdateCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly usersHasRoleModel: UsersHasRoleModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({ input, context }: UsersHasRoleUpdateCommand): Promise<Role> {
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

    this.eventBus.publish(new UsersHasRoleUpdatedEvent(usersHasRoleUpdated));

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
