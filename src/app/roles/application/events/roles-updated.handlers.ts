import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RolesUpdatedEvent } from '../../domain/events/roles-updated.event';
import { RolesRepository } from '../../infrastructure/repositories/roles.repository';

@EventsHandler(RolesUpdatedEvent)
export class RolesUpdatedEventHandlers
  implements IEventHandler<RolesUpdatedEvent> {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async handle(event: RolesUpdatedEvent) {
    return await this.rolesRepository.update(event.roles);
  }
}
