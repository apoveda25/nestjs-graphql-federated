import { ICommand } from '@nestjs/cqrs';
import { RemoveScopesRoleDto } from '../../../domain/dto/remove-scopes-role.dto';

export class RoleRemoveScopesCommand implements ICommand {
  constructor(public readonly roleHasScopes: RemoveScopesRoleDto[]) {}
}
