import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserChangedRoleEvent } from '../../domain/events/user-changed-role.event';
import { UsersHasRoleRepository } from '../../infrastructure/repositories/users-has-role.repository';

@EventsHandler(UserChangedRoleEvent)
export class UserChangedRoleEventHandler
  implements IEventHandler<UserChangedRoleEvent> {
  constructor(
    private readonly usersHasRoleRepository: UsersHasRoleRepository,
  ) {}

  async handle(event: UserChangedRoleEvent) {
    return await this.usersHasRoleRepository.update(event.input);
  }
}
