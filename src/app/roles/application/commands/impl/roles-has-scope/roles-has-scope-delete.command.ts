import { ICommand } from '@nestjs/cqrs';
import { DeleteRoleHasScopeDto } from '../../../../domain/dto/roles-has-scope/delete-role-has-scope.dto';

export class RolesHasScopeDeleteCommand implements ICommand {
  constructor(public readonly input: DeleteRoleHasScopeDto[]) {}
}
