import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { Role } from '../../roles/entities/role.entity';
import { RolesRepository } from '../../roles/repositories/roles.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UserModel {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    const conflictKey = await this.usersRepository.findOr({ _key: user._key });

    if (this.isUserExist(conflictKey)) throw new ConflictException();

    const conflictUsername = user.username
      ? await this.usersRepository.findOr({
          username: user.username,
        })
      : null;

    if (this.isThereAnotherUserWithTheSame(conflictUsername, user))
      throw new ConflictException();

    const conflictEmail = user.email
      ? await this.usersRepository.findOr({
          email: user.email,
        })
      : null;

    if (this.isThereAnotherUserWithTheSame(conflictEmail, user))
      throw new ConflictException();

    const conflictRoleId = await this.rolesRepository.findOr({
      _id: user.roleId,
    });

    if (this.isNotRoleExist(conflictRoleId)) throw new NotFoundException();

    user.password = await hash(user.password, await genSalt(10));

    return user;
  }

  async update(users: UpdateUserDto[]): Promise<User[]> {
    const usersCreated: User[] = [];

    for (const user of users) {
      const conflictKey = await this.usersRepository.findOr({
        _key: user._key,
      });

      if (this.isNotUserExist(conflictKey)) throw new NotFoundException();

      const conflictUsername = user.username
        ? await this.usersRepository.findOr({
            username: user.username,
          })
        : null;

      if (this.isThereAnotherUserWithTheSame(conflictUsername, user))
        throw new ConflictException();

      const conflictEmail = user.email
        ? await this.usersRepository.findOr({
            email: user.email,
          })
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
