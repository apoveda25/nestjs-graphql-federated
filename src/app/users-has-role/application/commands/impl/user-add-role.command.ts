import { ICommand } from '@nestjs/cqrs';
import { AddRoleUserDto } from '../../../domain/dto/add-role-user.dto';

export class UserAddRoleCommand implements ICommand {
  constructor(public readonly userHasRole: AddRoleUserDto) {}
}
