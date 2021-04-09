import { ICommand } from '@nestjs/cqrs';
import { RemoveScopesRoleDto } from '../../dto/remove-scopes-role.dto';

export class RoleRemoveScopesCommand implements ICommand {
  constructor(public readonly input: RemoveScopesRoleDto[]) {}
}
