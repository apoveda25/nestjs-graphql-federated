import { ICommand } from '@nestjs/cqrs';
import { IContextUser } from '../../../../../shared/interfaces/context-graphql.interface';
import { CreateUserDto } from '../../../domain/dto/create-user.dto';

export class UserCreateCommand implements ICommand {
  constructor(
    public readonly user: CreateUserDto,
    public readonly context: IContextUser,
  ) {}
}
