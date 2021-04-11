import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { genSalt, hash } from 'bcrypt';
import { Role } from '../../roles/entities/role.entity';
import { RoleFindQuery } from '../../roles/queries/impl/role-find.query';
import { User } from '../../users/entities/user.entity';
import { UserFindQuery } from '../../users/queries/impl/user-find.query';
import { SignUpAuthDto } from '../dto/sign-up-auth.dto';

@Injectable()
export class AuthModel {
  constructor(private readonly queryBus: QueryBus) {}

  async signUp(user: SignUpAuthDto): Promise<SignUpAuthDto> {
    const conflictKeyUsernameEmail = await this.queryBus.execute(
      new UserFindQuery({
        _key: user._key,
        username: user.username,
        email: user.email,
      }),
    );

    if (this.isUserExist(conflictKeyUsernameEmail))
      throw new ConflictException();

    const conflictRole = await this.queryBus.execute<RoleFindQuery, Role>(
      new RoleFindQuery({ default: true }),
    );

    if (this.isNotRoleExist(conflictRole)) throw new NotFoundException();

    user.password = await hash(user.password, await genSalt(10));

    user.roleId = conflictRole._id;

    return user;
  }

  private isUserExist(user: User): boolean {
    return user ? true : false;
  }

  private isNotRoleExist(role: Role): boolean {
    return !role;
  }
}
