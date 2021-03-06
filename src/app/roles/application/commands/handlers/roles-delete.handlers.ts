import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { UsersHasRoleInboundQuery } from '../../../../users/application/queries/impl/users-has-role/users-has-role-inbound.query';
import { Role } from '../../../domain/entities/role.entity';
import { RolesDeletedEvent } from '../../../domain/events/roles-deleted.event';
import { RoleModel } from '../../../domain/models/role.model';
import { RoleFindQuery } from '../../queries/impl/role-find.query';
import { RolesHasScopeOutboundQuery } from '../../queries/impl/roles-has-scope/roles-has-scope-outbound.query';
import { RolesDeleteCommand } from '../impl/roles-delete.command';

@CommandHandler(RolesDeleteCommand)
export class RolesDeleteCommandHandlers
  implements ICommandHandler<RolesDeleteCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly roleModel: RoleModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({ roles }: RolesDeleteCommand): Promise<Role[]> {
    const rolesDeleted: Role[] = [];

    for (const role of roles) {
      const conflictKey = await this.queryBus.execute(
        new RoleFindQuery(
          this.queryParseService.parseOneFilterByKey(
            { _key: role._key },
            OperatorBoolean.AND,
          ),
        ),
      );

      const conflictEdgeOut = await this.queryBus.execute(
        new RolesHasScopeOutboundQuery({ parentId: role._id }),
      );

      const conflictEdgeIn = await this.queryBus.execute(
        new UsersHasRoleInboundQuery({ parentId: role._id }),
      );

      const roleDeleted = await this.roleModel.delete(role, {
        conflictKey,
        conflictEdgeOut,
        conflictEdgeIn,
      });

      rolesDeleted.push(roleDeleted);
    }

    this.eventBus.publish(new RolesDeletedEvent(rolesDeleted));

    return rolesDeleted;
  }
}
