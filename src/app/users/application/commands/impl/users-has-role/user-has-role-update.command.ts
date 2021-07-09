import { ICommand } from '@nestjs/cqrs';
import { IContextUser } from 'src/shared/interfaces/context-graphql.interface';
import { UserHasRoleUpdateDto } from '../../../../domain/dto/users-has-role/user-has-role-update.dto';

export class UserHasRoleUpdateCommand implements ICommand {
  constructor(
    public readonly input: UserHasRoleUpdateDto,
    public readonly context: IContextUser,
  ) {}
}
