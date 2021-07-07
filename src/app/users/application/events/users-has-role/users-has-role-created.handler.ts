import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsersHasRoleCreatedEvent } from '../../../domain/events/users-has-role/users-has-role-created.event';
import { UsersHasRoleRepository } from '../../../infrastructure/repositories/users-has-role.repository';

@EventsHandler(UsersHasRoleCreatedEvent)
export class UsersHasRoleCreatedEventHandler
  implements IEventHandler<UsersHasRoleCreatedEvent>
{
  constructor(
    private readonly usersHasRoleRepository: UsersHasRoleRepository,
  ) {}

  async handle({ input }: UsersHasRoleCreatedEvent) {
    return await this.usersHasRoleRepository.create(input);
  }
}
