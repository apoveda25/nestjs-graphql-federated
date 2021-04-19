import { ICommand } from '@nestjs/cqrs';
import { UpdateUserDto } from '../../../domain/dto/update-user.dto';

export class UsersUpdateCommand implements ICommand {
  constructor(public readonly users: UpdateUserDto[]) {}
}
