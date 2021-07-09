import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RolesHasScopeDeletedEvent } from '../../../domain/events/roles-has-scope/roles-has-scope-deleted.event';
import { RolesHasScopesRepository } from '../../../infrastructure/repositories/roles-has-scopes.repository';

@EventsHandler(RolesHasScopeDeletedEvent)
export class RolesHasScopeDeletedEventHandler
  implements IEventHandler<RolesHasScopeDeletedEvent> {
  constructor(
    private readonly rolesHasScopeRepository: RolesHasScopesRepository,
  ) {}

  async handle({ input }: RolesHasScopeDeletedEvent) {
    return await this.rolesHasScopeRepository.delete(input);
  }
}
