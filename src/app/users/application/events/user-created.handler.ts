import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';

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
