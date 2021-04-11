import { IQuery } from '@nestjs/cqrs';
import { FindRoleHasScopeDto } from '../../dto/find-role-has-scope.dto';

export class RoleHasScopeFindAndQuery implements IQuery {
  constructor(public readonly input: FindRoleHasScopeDto) {}
}
