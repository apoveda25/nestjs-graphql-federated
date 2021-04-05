import { IQuery } from '@nestjs/cqrs';
import { FindRoleDto } from '../../dto/find-role.dto';

export class RoleFindQuery implements IQuery {
  constructor(public readonly input: FindRoleDto) {}
}
