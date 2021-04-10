import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../repositories/users.repository';
import { UsersUpdatedEvent } from '../impl/users-updated.event';

@EventsHandler(UsersUpdatedEvent)
export class UsersUpdatedEventHandler
  implements IEventHandler<UsersUpdatedEvent> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async handle(event: UsersUpdatedEvent) {
    return await this.usersRepository.update(event.users);
  }
}
