import { ICommand } from '@nestjs/cqrs';
import { CreateUserDto } from '../../../domain/dto/create-user.dto';

export class UserCreateCommand implements ICommand {
  constructor(public readonly user: CreateUserDto) {}
}
