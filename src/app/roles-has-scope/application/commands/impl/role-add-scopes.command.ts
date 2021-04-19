import { ICommand } from '@nestjs/cqrs';
import { AddScopesRoleDto } from '../../../domain/dto/add-scopes-role.dto';

export class RoleAddScopesCommand implements ICommand {
  constructor(public readonly roleHasScopes: AddScopesRoleDto[]) {}
}
