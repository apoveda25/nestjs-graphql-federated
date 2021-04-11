import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { RoleHasScopeOutQuery } from 'src/app/roles-has-scope/queries/impl/role-has-scope-out.query';
import { IEdge } from '../../../shared/interfaces/edge.interface';
import { UserHasRoleInQuery } from '../../users-has-role/queries/impl/user-has-role-in.query';
import { CreateRoleDto } from '../dto/create-role.dto';
import { DeleteRoleDto } from '../dto/delete-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';
import { RoleFindQuery } from '../queries/impl/role-find.query';

@Injectable()
export class RoleModel {
  constructor(private readonly queryBus: QueryBus) {}

  async create(role: CreateRoleDto): Promise<Role> {
    const conflictKey = await this.queryBus.execute(
      new RoleFindQuery({ _key: role._key }),
    );

    if (this.isRoleExist(conflictKey)) throw new ConflictException();

    const conflictName = await this.queryBus.execute(
      new RoleFindQuery({ name: role.name }),
    );

    if (this.isThereAnotherRoleWithTheSame(conflictName, role))
      throw new ConflictException();

    return role;
  }

  async update(roles: UpdateRoleDto[]): Promise<Role[]> {
    const rolesUpdated: Role[] = [];

    for (const role of roles) {
      const conflictKey = await this.queryBus.execute(
        new RoleFindQuery({ _key: role._key }),
      );

      if (this.isNotRoleExist(conflictKey)) throw new NotFoundException();

      const conflictName = role.name
        ? await this.queryBus.execute(new RoleFindQuery({ name: role.name }))
        : null;

      if (this.isThereAnotherRoleWithTheSame(conflictName, role))
        throw new ConflictException();

      const conflictDefault = role.default
        ? await this.queryBus.execute(
            new RoleFindQuery({ default: role.default }),
          )
        : null;

      if (this.isThereAnotherRoleWithTheSame(conflictDefault, role))
        throw new ConflictException();

      rolesUpdated.push({ ...conflictKey, ...role });
    }

    return rolesUpdated;
  }

  async delete(roles: DeleteRoleDto[]): Promise<Role[]> {
    const rolesDeleted: Role[] = [];

    for (const role of roles) {
      const conflictKey = await this.queryBus.execute(
        new RoleFindQuery({ _key: role._key }),
      );

      if (this.isNotRoleExist(conflictKey)) throw new NotFoundException();

      const conflictEdgeOut = await this.queryBus.execute(
        new RoleHasScopeOutQuery({
          filters: [],
          sort: [],
          pagination: { offset: 0, count: 1 },
          parentId: role._id,
        }),
      );

      if (this.haveEdgeConnections(conflictEdgeOut))
        throw new BadRequestException();

      const conflictEdgeIn = await this.queryBus.execute(
        new UserHasRoleInQuery({
          filters: [],
          sort: [],
          pagination: { offset: 0, count: 1 },
          parentId: role._id,
        }),
      );

      if (this.haveEdgeConnections(conflictEdgeIn))
        throw new BadRequestException();

      rolesDeleted.push(conflictKey);
    }

    return rolesDeleted;
  }

  private isRoleExist(role: Role): boolean {
    return role ? true : false;
  }

  private isNotRoleExist(role: Role): boolean {
    return !role;
  }

  private isThereAnotherRoleWithTheSame(
    roleConflict: Role,
    role: CreateRoleDto | UpdateRoleDto,
  ): boolean {
    return roleConflict && roleConflict._key !== role._key;
  }

  private haveEdgeConnections(roleConflict: IEdge[]): boolean {
    return roleConflict.length ? true : false;
  }
}
