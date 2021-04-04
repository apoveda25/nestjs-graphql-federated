import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RolesRepository } from '../../repositories/roles.repository';
import { RolesDeletedEvent } from '../impl/roles-deleted.event';

@EventsHandler(RolesDeletedEvent)
export class RolesDeletedEventHandlers
  implements IEventHandler<RolesDeletedEvent> {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async handle(event: RolesDeletedEvent) {
    return await this.rolesRepository.delete(event.roles);
  }
}
