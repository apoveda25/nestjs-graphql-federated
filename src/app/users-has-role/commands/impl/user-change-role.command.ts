import { ICommand } from '@nestjs/cqrs';
import { ChangeRoleUserDto } from '../../dto/change-role-user.dto';

export class UserChangeRoleCommand implements ICommand {
  constructor(public readonly input: ChangeRoleUserDto) {}
}
