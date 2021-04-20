import { IEvent } from '@nestjs/cqrs';
import { CreateUserDto } from '../../domain/dto/create-user.dto';

export class UserCreatedEvent implements IEvent {
  constructor(public readonly user: CreateUserDto) {}
}
