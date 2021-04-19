import { ICommand } from '@nestjs/cqrs';
import { RemoveScopesRoleDto } from '../../../../roles-has-scope/domain/dto/remove-scopes-role.dto';

export class RoleRemoveScopesCommand implements ICommand {
  constructor(public readonly input: RemoveScopesRoleDto[]) {}
}
