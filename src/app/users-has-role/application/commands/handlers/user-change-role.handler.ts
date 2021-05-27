import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { RoleFindQuery } from '../../../../roles/application/queries/impl/role-find.query';
import { UserFindQuery } from '../../../../users/application/queries/impl/user-find.query';
import { UserChangedRoleEvent } from '../../../domain/events/user-changed-role.event';
import { UsersHasRoleModel } from '../../../domain/models/users-has-role.model';
import { UserHasRoleOutEdgeQuery } from '../../queries/impl/user-has-role-out-edge.query';
import { UserChangeRoleCommand } from '../impl/user-change-role.command';

@CommandHandler(UserChangeRoleCommand)
export class UserChangeRoleCommandHandler
  implements ICommandHandler<UserChangeRoleCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly usersHasRoleModel: UsersHasRoleModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({
    userHasRole,
    context,
  }: UserChangeRoleCommand): Promise<boolean> {
    const conflictFrom = await this.queryBus.execute(
      new UserFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _id: userHasRole._from },
          OperatorBoolean.AND,
        ),
      ),
    );

    const conflictTo = await this.queryBus.execute(
      new RoleFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _id: userHasRole._to },
          OperatorBoolean.AND,
        ),
      ),
    );

    const conflictEdge = await this.queryBus.execute(
      new UserHasRoleOutEdgeQuery({ parentId: userHasRole._from }),
    );

    const userChangedRole = await this.usersHasRoleModel.update(
      userHasRole,
      {
        conflictFrom,
        conflictTo,
        conflictEdge,
      },
      context,
    );

    this.eventBus.publish(new UserChangedRoleEvent(userChangedRole));

    return true;
  }
}
