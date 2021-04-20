import { IEvent } from '@nestjs/cqrs';
import { User } from '../entities/user.entity';

export class UsersUpdatedEvent implements IEvent {
  constructor(public readonly users: User[]) {}
}
