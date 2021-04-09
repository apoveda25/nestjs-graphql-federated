import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsersHasRoleRepository } from '../../repositories/users-has-role.repository';
import { UserAddedRoleEvent } from '../impl/user-added-role.event';

@EventsHandler(UserAddedRoleEvent)
export class UserAddedRoleEventHandler
  implements IEventHandler<UserAddedRoleEvent> {
  constructor(
    private readonly usersHasRoleRepository: UsersHasRoleRepository,
  ) {}

  async handle(event: UserAddedRoleEvent) {
    return await this.usersHasRoleRepository.create(event.edge);
  }
}
