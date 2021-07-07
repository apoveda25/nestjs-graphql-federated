import { ICommand } from '@nestjs/cqrs';
import { UserHasRoleCreateDto } from '../../../../domain/dto/users-has-role/user-has-role-create.dto';

export class UserHasRoleCreateCommand implements ICommand {
  constructor(public readonly input: UserHasRoleCreateDto) {}
}
