import { ICommand } from '@nestjs/cqrs';
import { UpdateRoleDto } from '../../../domain/dto/update-role.dto';

export class RolesUpdateCommand implements ICommand {
  constructor(public readonly roles: UpdateRoleDto[]) {}
}
