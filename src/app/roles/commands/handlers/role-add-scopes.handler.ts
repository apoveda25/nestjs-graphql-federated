import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ScopesRepository } from '../../../scopes/repositories/scopes.repository';
import { AddScopesRoleDto } from '../../dto/add-scopes-role.dto';
import { RoleAddedScopesEvent } from '../../events/impl/role-added-scopes.event';
import { RoleModel } from '../../models/role.model';
import { RolesRepository } from '../../repositories/roles.repository';
import { RoleAddScopesCommand } from '../impl/role-add-scopes.command';

@CommandHandler(RoleAddScopesCommand)
export class RoleAddScopesCommandHandler
  implements ICommandHandler<RoleAddScopesCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly rolesRepository: RolesRepository,
    private readonly scopesRepository: ScopesRepository,
    private readonly roleModel: RoleModel,
  ) {}

  async execute(command: RoleAddScopesCommand): Promise<boolean> {
    const addScopes: AddScopesRoleDto[] = [];

    for (const edge of command.input) {
      const { _from, _to } = edge;
      const withFrom = await this.rolesRepository.findOr({ _id: _from });
      const withTo = await this.scopesRepository.findOr({ _id: _to });

      const roleAddScope = this.roleModel.addScope(edge, {
        withFrom,
        withTo,
      });

      addScopes.push(roleAddScope);
    }

    this.eventBus.publish(new RoleAddedScopesEvent(addScopes));

    return true;
  }
}
