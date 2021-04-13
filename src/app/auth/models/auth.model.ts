import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { compare, genSalt, hash } from 'bcrypt';
import { Role } from '../../roles/entities/role.entity';
import { RoleFindQuery } from '../../roles/queries/impl/role-find.query';
import { User } from '../../users/entities/user.entity';
import { UserFindQuery } from '../../users/queries/impl/user-find.query';
import { SignInAuthDto } from '../dto/sign-in-auth.dto';
import { SignUpAuthDto } from '../dto/sign-up-auth.dto';

@Injectable()
export class AuthModel {
  constructor(private readonly queryBus: QueryBus) {}

  async signUp(payload: SignUpAuthDto): Promise<SignUpAuthDto> {
    const conflictKeyUsernameEmail = await this.queryBus.execute(
      new UserFindQuery({
        _key: payload._key,
        username: payload.username,
        email: payload.email,
      }),
    );

    if (this.isUserExist(conflictKeyUsernameEmail))
      throw new ConflictException();

    const conflictRole = await this.queryBus.execute<RoleFindQuery, Role>(
      new RoleFindQuery({ default: true }),
    );

    if (this.isNotRoleExist(conflictRole)) throw new NotFoundException();

    payload.password = await hash(payload.password, await genSalt(10));

    payload.roleId = conflictRole._id;

    return payload;
  }

  async signIn(payload: SignInAuthDto): Promise<User> {
    const conflictUsernameEmail = await this.queryBus.execute<
      UserFindQuery,
      User
    >(
      new UserFindQuery({
        username: payload.usernameOrEmail,
        email: payload.usernameOrEmail,
      }),
    );

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
