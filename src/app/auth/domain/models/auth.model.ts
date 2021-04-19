import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { Role } from '../../../roles/domain/entities/role.entity';
import { User } from '../../../users/domain/entities/user.entity';
import { SignInAuthDto } from '../dto/sign-in-auth.dto';
import { SignUpAuthDto } from '../dto/sign-up-auth.dto';

@Injectable()
export class AuthModel {
  async signUp(
    payload: SignUpAuthDto,
    conflictKeyUsernameEmail: User,
    conflictRole: Role,
  ): Promise<SignUpAuthDto> {
    if (this.isUserExist(conflictKeyUsernameEmail))
      throw new ConflictException();

    if (this.isNotRoleExist(conflictRole)) throw new NotFoundException();

    payload.password = await hash(payload.password, await genSalt(10));

    payload.roleId = conflictRole._id;

    return payload;
  }

  async signIn(
    payload: SignInAuthDto,
    conflictUsernameEmail: User,
  ): Promise<User> {
    if (this.isNoUserExist(conflictUsernameEmail))
      throw new UnauthorizedException();

    const isPasswordMatch = await compare(
      payload.password,
      conflictUsernameEmail.password,
    );

    if (isPasswordMatch) return conflictUsernameEmail;

    throw new UnauthorizedException();
  }

  private isUserExist(user: User): boolean {
    return user ? true : false;
  }

  private isNoUserExist(user: User): boolean {
    return !user ? true : false;
  }

  private isNotRoleExist(role: Role): boolean {
    return !role;
  }
}
