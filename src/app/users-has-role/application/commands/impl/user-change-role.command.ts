import { ICommand } from '@nestjs/cqrs';
import { ChangeRoleUserDto } from '../../../domain/dto/change-role-user.dto';

export class UserChangeRoleCommand implements ICommand {
  constructor(public readonly userHasRole: ChangeRoleUserDto) {}
}
