import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { Role } from '../../roles/entities/role.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { IUserCreateConflits } from '../interfaces/user.interfaces';

@Injectable()
export class UserModel {
  create(
    user: CreateUserDto,
    { withKey, withUsernameEmail, withRoleId }: IUserCreateConflits,
  ): CreateUserDto {
    if (this.isUserExist(withKey)) throw new ConflictException();

    if (
      this.isThereAnotherUserWithTheSameUsernameEmail(withUsernameEmail, user)
    )
      throw new ConflictException();

    if (this.isNotRoleExist(withRoleId)) throw new NotFoundException();

    user.password = hashSync(user.password, genSaltSync(10));

    return user;
  }

  private isUserExist(user: User): boolean {
    return user ? true : false;
  }

  private isThereAnotherUserWithTheSameUsernameEmail(
    userConflict: User,
    user: CreateUserDto,
  ): boolean {
    return userConflict && userConflict._key !== user._key;
  }

  private isNotRoleExist(role: Role): boolean {
    return !role;
  }
}
