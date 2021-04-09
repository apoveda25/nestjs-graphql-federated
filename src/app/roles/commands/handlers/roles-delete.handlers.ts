import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Role } from '../../entities/role.entity';
import { RolesDeletedEvent } from '../../events/impl/roles-deleted.event';
import { RoleModel } from '../../models/role.model';
import { RolesRepository } from '../../repositories/roles.repository';
import { RolesDeleteCommand } from '../impl/roles-delete.command';

@CommandHandler(RolesDeleteCommand)
export class RolesDeleteCommandHandlers
  implements ICommandHandler<RolesDeleteCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly rolesRepository: RolesRepository,
    private readonly roleModel: RoleModel,
  ) {}

  async execute(command: RolesDeleteCommand): Promise<Role[]> {
    const rolesDeleted: Role[] = [];

    for (const role of command.roles) {
      const { _id, _key } = role;

      const roleConflictKey = await this.rolesRepository.findOr({ _key });

      const roleConflictEdgeConnections = await this.rolesRepository.searchEdgeConnections(
        {
          direction: 'ANY',
          startVertexId: _id,
          collections: ['UsersHasRole', 'RolesHasScope'],
        },
      );

      const roleDeleted = this.roleModel.delete(role, {
        withKey: roleConflictKey,
        withEdges: roleConflictEdgeConnections,
      });

      rolesDeleted.push(roleDeleted);
    }

    this.eventBus.publish(new RolesDeletedEvent(rolesDeleted));

    return rolesDeleted;
  }
}
