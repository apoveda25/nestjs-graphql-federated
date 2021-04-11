import { ICommand } from '@nestjs/cqrs';
import { AddScopesRoleDto } from '../../../roles-has-scope/dto/add-scopes-role.dto';

export class RoleAddScopesCommand implements ICommand {
  constructor(public readonly input: AddScopesRoleDto[]) {}
}
