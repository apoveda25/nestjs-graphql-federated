import { ICommand } from '@nestjs/cqrs';
import { CreateRoleHasScopeDto } from '../../../../domain/dto/roles-has-scope/create-role-has-scope.dto';

export class RolesHasScopeCreateCommand implements ICommand {
  constructor(public readonly input: CreateRoleHasScopeDto[]) {}
}
