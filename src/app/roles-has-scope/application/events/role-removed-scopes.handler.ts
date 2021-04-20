import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RoleRemovedScopesEvent } from '../../domain/events/role-removed-scopes.event';
import { RolesHasScopeRepository } from '../../infrastructure/repositories/roles-has-scope.repository';

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
