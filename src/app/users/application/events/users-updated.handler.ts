import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsersUpdatedEvent } from '../../domain/events/users-updated.event';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';

@EventsHandler(UsersUpdatedEvent)
export class UsersUpdatedEventHandler
  implements IEventHandler<UsersUpdatedEvent> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async handle(event: UsersUpdatedEvent) {
    return await this.usersRepository.update(event.users);
  }
}
