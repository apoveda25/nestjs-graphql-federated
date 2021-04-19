import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RoleCreatedEvent } from '../../domain/events/role-created.event';
import { RolesRepository } from '../../infrastructure/repositories/roles.repository';

@EventsHandler(RoleCreatedEvent)
export class RoleCreatedEventHandler
  implements IEventHandler<RoleCreatedEvent> {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async handle(event: RoleCreatedEvent) {
    return await this.rolesRepository.create(event.role);
  }
}
