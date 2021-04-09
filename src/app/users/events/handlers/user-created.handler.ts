import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../repositories/users.repository';
import { UserCreatedEvent } from '../impl/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async handle(event: UserCreatedEvent) {
    const createUserDao = { ...event.user };
    delete createUserDao.roleId;

    return await this.usersRepository.create(createUserDao);
  }
}
