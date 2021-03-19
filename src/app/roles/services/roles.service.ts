import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateRoleInput } from '../dto/create-role.input';
import { UpdateRoleInput } from '../dto/update-role.input';
import { RoleCreateModel } from '../models/role-create.model';
import { RolesRepository } from '../repositories/roles.repository';

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createRoleInput: CreateRoleInput[]) {
    const aggregates: RoleCreateModel[] = [];

    for (const { role } of createRoleInput) {
      const roleConflicts = await this.rolesRepository.search({
        filters: [
          { key: '_id', value: role._id, separator: 'OR', operator: '==' },
          {
            key: 'name',
            value: role.name,
            separator: 'OR',
            operator: '==',
          },
        ],
        sort: [],
        pagination: { count: 1, offset: 0 },
      });

      const aggregate = new RoleCreateModel({ role });

      aggregate.create(roleConflicts);

      aggregates.push(aggregate);
    }

    aggregates.map((aggregate, i) =>
      aggregate.commit(this.eventEmitter, createRoleInput[i]),
    );

    return await this.rolesRepository.create(
      createRoleInput.map((input) => input.role),
    );
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleInput: UpdateRoleInput) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
