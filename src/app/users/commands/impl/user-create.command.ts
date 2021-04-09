import { ICommand } from '@nestjs/cqrs';
import { CreateUserDto } from '../../dto/create-user.dto';

export class UserCreateCommand implements ICommand {
  constructor(public readonly user: CreateUserDto) {}
}
