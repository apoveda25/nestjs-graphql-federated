import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RolesHasScopeCreatedEvent } from '../../../domain/events/roles-has-scope/roles-has-scope-created.event';
import { RolesHasScopesRepository } from '../../../infrastructure/repositories/roles-has-scopes.repository';

@EventsHandler(RolesHasScopeCreatedEvent)
export class RolesHasScopeCreatedEventHandler
  implements IEventHandler<RolesHasScopeCreatedEvent> {
  constructor(
    private readonly rolesHasScopeRepository: RolesHasScopesRepository,
  ) {}

  async handle({ input }: RolesHasScopeCreatedEvent) {
    return await this.rolesHasScopeRepository.create(input);
  }
}
