import { ICommand } from '@nestjs/cqrs';
import { UpdateRoleDto } from '../../dto/update-role.dto';

export class RolesUpdateCommand implements ICommand {
  constructor(public readonly roles: UpdateRoleDto[]) {}
}
