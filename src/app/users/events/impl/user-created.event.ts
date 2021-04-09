import { IEvent } from '@nestjs/cqrs';
import { CreateUserDto } from '../../dto/create-user.dto';

export class UserCreatedEvent implements IEvent {
  constructor(public readonly user: CreateUserDto) {}
}
