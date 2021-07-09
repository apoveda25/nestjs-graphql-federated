import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserHasRoleCreatedEvent } from '../../../domain/events/users-has-role/user-has-role-created.event';
import { UsersHasRoleRepository } from '../../../infrastructure/repositories/users-has-role.repository';

@EventsHandler(UserHasRoleCreatedEvent)
export class UserHasRoleCreatedEventHandler
  implements IEventHandler<UserHasRoleCreatedEvent>
{
  constructor(
    private readonly usersHasRoleRepository: UsersHasRoleRepository,
  ) {}

  async handle({ input }: UserHasRoleCreatedEvent) {
    return await this.usersHasRoleRepository.create(input);
  }
}
