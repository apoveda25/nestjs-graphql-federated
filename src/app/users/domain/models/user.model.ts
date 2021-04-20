import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
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
  ): Promise<CreateUserDto> {
    if (this.isUserExist(conflictKeyUsernameEmail))
      throw new ConflictException();

    if (this.isNotRoleExist(conflictRoleId)) throw new NotFoundException();

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
}
