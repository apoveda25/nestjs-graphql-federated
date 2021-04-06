import { IQuery } from '@nestjs/cqrs';
import { FindRoleInput } from '../../dto/find-role.input';

export class RoleFindQuery implements IQuery {
  constructor(public readonly input: FindRoleInput) {}
}
