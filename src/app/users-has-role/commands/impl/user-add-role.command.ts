import { ICommand } from '@nestjs/cqrs';
import { AddRoleUserDto } from '../../dto/add-role-user.dto';

export class UserAddRoleCommand implements ICommand {
  constructor(public readonly edge: AddRoleUserDto) {}
}
