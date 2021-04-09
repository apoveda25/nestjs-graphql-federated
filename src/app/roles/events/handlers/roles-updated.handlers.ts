import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RolesRepository } from '../../repositories/roles.repository';
import { RolesUpdatedEvent } from '../impl/roles-updated.event';

@EventsHandler(RolesUpdatedEvent)
export class RolesUpdatedEventHandlers
  implements IEventHandler<RolesUpdatedEvent> {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async handle(event: RolesUpdatedEvent) {
    return await this.rolesRepository.update(event.roles);
  }
}
