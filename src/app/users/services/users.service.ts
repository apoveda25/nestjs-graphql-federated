import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { UserCreateModel } from '../models/user-create.model';
import { CredentialsRepository } from '../repositories/credentials.repository';
import { RolesRepository } from '../repositories/roles.repository';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly credentialsRepository: CredentialsRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async create(createUserInput: CreateUserInput[]) {
    const aggregates: UserCreateModel[] = [];

    for (const { user, roleId } of createUserInput) {
      const userConflicts = await this.usersRepository.search({
        filters: [
          { key: '_id', value: user._id, separator: 'OR', operator: '==' },
          {
            key: 'username',
            value: user.username,
            separator: 'OR',
            operator: '==',
          },
          {
            key: 'email',
            value: user.email,
            separator: 'OR',
            operator: '==',
          },
        ],
        sort: [],
        pagination: { count: 1, offset: 0 },
      });

      const roleConflicts = await this.rolesRepository.find(roleId);

      const aggregate = new UserCreateModel({ user, roleId });

      aggregate.create(userConflicts, roleConflicts);

      aggregates.push(aggregate);
    }

    aggregates.map(
      (aggregate, i) =>
        // aggregate.commit(this.eventEmitter, createUserInput[i]),
        aggregate,
    );

    await this.credentialsRepository.create(
      createUserInput.map(({ user, roleId }) => ({
        _from: user._id,
        _to: roleId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        createdBy: user.createdBy,
        updatedBy: user.updatedBy,
      })),
    );

    return await this.usersRepository.create(
      createUserInput.map((input) => input.user),
    );
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
