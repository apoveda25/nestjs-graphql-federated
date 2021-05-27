import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { GraphQLError } from 'graphql';
import { IContextUser } from '../../../../shared/interfaces/context-graphql.interface';
import { Role } from '../../../roles/domain/entities/role.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import {
  IUserCreateConflits,
  IUserUpdateConflits,
} from '../interfaces/user.interfaces';

@Injectable()
export class UserModel {
  async create(
    user: CreateUserDto,
    { conflictKeyUsernameEmail, conflictRoleId }: IUserCreateConflits,
    context: IContextUser,
  ): Promise<CreateUserDto> {
    if (this.isUserExist(conflictKeyUsernameEmail))
      throw new GraphQLError('Conflict');

    if (this.isNotRoleExist(conflictRoleId))
      throw new GraphQLError('Not Found');

    if (
      this.isLevelRoleAssignedLessEqualRoleUserCurrent(conflictRoleId, context)
    )
      throw new GraphQLError('Bad Request');

    user.password = await hash(user.password, await genSalt(10));

    return user;
  }

  async update(
    user: UpdateUserDto,
    { conflictKey, conflictUsername, conflictEmail }: IUserUpdateConflits,
  ): Promise<User> {
    if (this.isNotUserExist(conflictKey)) throw new NotFoundException();

    if (this.isThereAnotherUserWithTheSame(conflictUsername, user))
      throw new ConflictException();

    if (this.isThereAnotherUserWithTheSame(conflictEmail, user))
      throw new ConflictException();

    return { ...conflictKey, ...user };
  }

  private isNotUserExist(user: User): boolean {
    return !user ? true : false;
  }

  private isUserExist(user: User): boolean {
    return user ? true : false;
  }

  private isThereAnotherUserWithTheSame(
    userConflict: User,
    user: CreateUserDto | UpdateUserDto,
  ): boolean {
    return userConflict && userConflict._key !== user._key;
  }

  private isNotRoleExist(role: Role): boolean {
    return !role;
  }

  private isLevelRoleAssignedLessEqualRoleUserCurrent(
    role: Role,
    context: IContextUser,
  ): boolean {
    return role.level <= context.role.level;
  }
}
