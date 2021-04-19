import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RoleAddedScopesEvent } from '../../domain/events/role-added-scopes.event';
import { RolesHasScopeRepository } from '../../infrastructure/repositories/roles-has-scope.repository';

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
