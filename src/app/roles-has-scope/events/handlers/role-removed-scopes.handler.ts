import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RolesHasScopeRepository } from '../../repositories/roles-has-scope.repository';
import { RoleRemovedScopesEvent } from '../impl/role-removed-scopes.event';

@EventsHandler(RoleRemovedScopesEvent)
export class RoleRemovedScopesEventHandler
  implements IEventHandler<RoleRemovedScopesEvent> {
  constructor(
    private readonly rolesHasScopeRepository: RolesHasScopeRepository,
  ) {}

  async handle(event: RoleRemovedScopesEvent) {
    return await this.rolesHasScopeRepository.delete(event.input);
  }
}
