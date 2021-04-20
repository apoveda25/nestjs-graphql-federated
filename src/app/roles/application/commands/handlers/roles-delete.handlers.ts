import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { RoleHasScopeOutQuery } from '../../../../roles-has-scope/application/queries/impl/role-has-scope-out.query';
import { UserHasRoleInQuery } from '../../../../users-has-role/application/queries/impl/user-has-role-in.query';
import { Role } from '../../../domain/entities/role.entity';
import { RolesDeletedEvent } from '../../../domain/events/roles-deleted.event';
import { RoleModel } from '../../../domain/models/role.model';
import { RoleFindQuery } from '../../queries/impl/role-find.query';
import { RolesDeleteCommand } from '../impl/roles-delete.command';

@CommandHandler(RolesDeleteCommand)
export class RolesDeleteCommandHandlers
  implements ICommandHandler<RolesDeleteCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly roleModel: RoleModel,
  ) {}

  async execute({ roles }: RolesDeleteCommand): Promise<Role[]> {
    const rolesDeleted: Role[] = [];

    for (const role of roles) {
      const conflictKey = await this.queryBus.execute(
        new RoleFindQuery({ _key: role._key }),
      );

      const conflictEdgeOut = await this.queryBus.execute(
        new RoleHasScopeOutQuery({
          filters: [],
          sort: [],
          pagination: { offset: 0, count: 1 },
          parentId: role._id,
        }),
      );

      const conflictEdgeIn = await this.queryBus.execute(
        new UserHasRoleInQuery({
          filters: [],
          sort: [],
          pagination: { offset: 0, count: 1 },
          parentId: role._id,
        }),
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