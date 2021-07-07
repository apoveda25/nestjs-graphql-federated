import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserHasRoleUpdatedEvent } from '../../../domain/events/users-has-role/user-has-role-updated.event';
import { UsersHasRoleRepository } from '../../../infrastructure/repositories/users-has-role.repository';

@EventsHandler(UserHasRoleUpdatedEvent)
export class UserHasRoleUpdatedEventHandler
  implements IEventHandler<UserHasRoleUpdatedEvent>
{
  constructor(
    private readonly usersHasRoleRepository: UsersHasRoleRepository,
  ) {}

  async handle({ input }: UserHasRoleUpdatedEvent) {
    return await this.usersHasRoleRepository.update(input);
  }
}
