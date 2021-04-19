import { ICommand } from '@nestjs/cqrs';
import { DeleteRoleDto } from '../../../domain/dto/delete-role.dto';

export class RolesDeleteCommand implements ICommand {
  constructor(public readonly roles: DeleteRoleDto[]) {}
}
