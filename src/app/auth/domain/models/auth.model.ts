import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { GraphQLError } from 'graphql';
import { Role } from '../../../roles/domain/entities/role.entity';
import { User } from '../../../users/domain/entities/user.entity';
import { SignInAuthDto } from '../dto/sign-in-auth.dto';
import { SignUpAuthDto } from '../dto/sign-up-auth.dto';
import { IAuthLoginConflicts } from '../interfaces/auth.interface';

@Injectable()
export class AuthModel {
  async signUp(
    payload: SignUpAuthDto,
    conflictKeyUsernameEmail: User,
    conflictRole: Role,
  ): Promise<SignUpAuthDto> {
    if (this.isUserExist(conflictKeyUsernameEmail))
      throw new GraphQLError('Conflict');

    if (this.isNotRoleExist(conflictRole)) throw new GraphQLError('Not Found');

    payload.password = await hash(payload.password, await genSalt(10));

    payload.roleId = conflictRole._id;

    return payload;
  }

  async signIn(
    payload: SignInAuthDto,
    conflictUsernameEmail: User,
  ): Promise<User> {
    if (this.isNoUserExist(conflictUsernameEmail))
      throw new GraphQLError('Unauthorized');

    const isPasswordMatch = await compare(
      payload.password,
      conflictUsernameEmail.password,
    );

    if (isPasswordMatch) return conflictUsernameEmail;

    throw new GraphQLError('Unauthorized');
  }

  async login(
    payload: SignInAuthDto,
    { conflictUsernameEmail, conflictRole }: IAuthLoginConflicts,
  ): Promise<User> {
    if (this.isRoleDefault(conflictRole))
      throw new GraphQLError('Unauthorized, role default');

    if (this.isNoUserExist(conflictUsernameEmail))
      throw new GraphQLError('Unauthorized');

    const isPasswordMatch = await compare(
      payload.password,
      conflictUsernameEmail.password,
    );

    if (isPasswordMatch) return conflictUsernameEmail;

    throw new GraphQLError('Unauthorized');
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

  private isRoleDefault(role: Role): boolean {
    return role.default;
  }
}
