import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsersHasRoleRepository } from '../../repositories/users-has-role.repository';
import { UserChangedRoleEvent } from '../impl/user-changed-role.event';

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
