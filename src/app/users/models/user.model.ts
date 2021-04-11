import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { genSalt, hash } from 'bcrypt';
import { Role } from '../../roles/entities/role.entity';
import { RoleFindQuery } from '../../roles/queries/impl/role-find.query';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserFindQuery } from '../queries/impl/user-find.query';

@Injectable()
export class UserModel {
  constructor(private readonly queryBus: QueryBus) {}

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    const conflictKey = await this.queryBus.execute(
      new UserFindQuery({ _key: user._key }),
    );

    if (this.isUserExist(conflictKey)) throw new ConflictException();

    const conflictUsername = user.username
      ? await this.queryBus.execute(
          new UserFindQuery({ username: user.username }),
        )
      : null;

    if (this.isThereAnotherUserWithTheSame(conflictUsername, user))
      throw new ConflictException();

    const conflictEmail = user.email
      ? await this.queryBus.execute(new UserFindQuery({ email: user.email }))
      : null;

    if (this.isThereAnotherUserWithTheSame(conflictEmail, user))
      throw new ConflictException();

    const conflictRoleId = await this.queryBus.execute(
      new RoleFindQuery({ _id: user.roleId }),
    );

    if (this.isNotRoleExist(conflictRoleId)) throw new NotFoundException();

    user.password = await hash(user.password, await genSalt(10));

    return user;
  }

  async update(users: UpdateUserDto[]): Promise<User[]> {
    const usersCreated: User[] = [];

    for (const user of users) {
      const conflictKey = await this.queryBus.execute(
        new UserFindQuery({ _key: user._key }),
      );

      if (this.isNotUserExist(conflictKey)) throw new NotFoundException();

      const conflictUsername = user.username
        ? await this.queryBus.execute(
            new UserFindQuery({ username: user.username }),
          )
        : null;

      if (this.isThereAnotherUserWithTheSame(conflictUsername, user))
        throw new ConflictException();

      const conflictEmail = user.email
        ? await this.queryBus.execute(new UserFindQuery({ email: user.email }))
        : null;

      if (this.isThereAnotherUserWithTheSame(conflictEmail, user))
        throw new ConflictException();

      usersCreated.push({ ...conflictKey, ...user });
    }

    return usersCreated;
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
