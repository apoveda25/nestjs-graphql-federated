import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RolesHasScopeRepository } from '../../repositories/roles-has-scope.repository';
import { RoleAddedScopesEvent } from '../impl/role-added-scopes.event';

@EventsHandler(RoleAddedScopesEvent)
export class RoleAddedScopesEventHandler
  implements IEventHandler<RoleAddedScopesEvent> {
  constructor(
    private readonly rolesHasScopeRepository: RolesHasScopeRepository,
  ) {}

  async handle(event: RoleAddedScopesEvent) {
    return await this.rolesHasScopeRepository.create(event.input);
  }
}
