import { ICommand } from '@nestjs/cqrs';
import { IContextUser } from '../../../../../shared/interfaces/context-graphql.interface';
import { ChangeRoleUserDto } from '../../../domain/dto/change-role-user.dto';

export class UserChangeRoleCommand implements ICommand {
  constructor(
    public readonly userHasRole: ChangeRoleUserDto,
    public readonly context: IContextUser,
  ) {}
}
