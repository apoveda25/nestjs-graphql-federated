import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsersHasRoleUpdatedEvent } from '../../../domain/events/users-has-role/users-has-role-updated.event';
import { UsersHasRoleRepository } from '../../../infrastructure/repositories/users-has-role.repository';

@EventsHandler(UsersHasRoleUpdatedEvent)
export class UsersHasRoleUpdatedEventHandler
  implements IEventHandler<UsersHasRoleUpdatedEvent>
{
  constructor(
    private readonly usersHasRoleRepository: UsersHasRoleRepository,
  ) {}

  async handle({ input }: UsersHasRoleUpdatedEvent) {
    return await this.usersHasRoleRepository.update(input);
  }
}
