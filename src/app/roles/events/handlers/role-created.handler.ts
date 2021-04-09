import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RolesRepository } from '../../repositories/roles.repository';
import { RoleCreatedEvent } from '../impl/role-created.event';

@EventsHandler(RoleCreatedEvent)
export class RoleCreatedEventHandler
  implements IEventHandler<RoleCreatedEvent> {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async handle(event: RoleCreatedEvent) {
    return await this.rolesRepository.create(event.role);
  }
}
