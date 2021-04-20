import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RolesDeletedEvent } from '../../domain/events/roles-deleted.event';
import { RolesRepository } from '../../infrastructure/repositories/roles.repository';

@EventsHandler(RolesDeletedEvent)
export class RolesDeletedEventHandlers
  implements IEventHandler<RolesDeletedEvent> {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async handle(event: RolesDeletedEvent) {
    return await this.rolesRepository.delete(event.roles);
  }
}
