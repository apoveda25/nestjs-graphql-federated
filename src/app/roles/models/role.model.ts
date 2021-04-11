import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Edge } from 'arangojs/documents';
import { IEdge } from '../../../shared/interfaces/edge.interface';
import { Scope } from '../../scopes/entities/scope.entity';
import { ScopeFindQuery } from '../../scopes/queries/impl/scope-find.query';
import { AddScopesRoleDto } from '../dto/add-scopes-role.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { DeleteRoleDto } from '../dto/delete-role.dto';
import { RemoveScopesRoleDto } from '../dto/remove-scopes-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';
import { RoleFindQuery } from '../queries/impl/role-find.query';
import { RolesHasScopeRepository } from '../repositories/roles-has-scope.repository';
import { RolesRepository } from '../repositories/roles.repository';

@Injectable()
export class RoleModel {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly rolesHasScopeRepository: RolesHasScopeRepository,
    private readonly queryBus: QueryBus,
  ) {}

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

      const conflictEdgeConnections = await this.rolesRepository.searchEdgeConnections(
        {
          direction: 'ANY',
          startVertexId: role._id,
          collections: ['UsersHasRole', 'RolesHasScope'],
        },
      );

      if (this.haveEdgeConnections(conflictEdgeConnections))
        throw new BadRequestException();

      rolesDeleted.push(conflictKey);
    }

    return rolesDeleted;
  }

  async addScopes(edges: AddScopesRoleDto[]): Promise<AddScopesRoleDto[]> {
    const addedScopesToRole: AddScopesRoleDto[] = [];

    for (const edge of edges) {
      const conflictFrom = await this.queryBus.execute(
        new RoleFindQuery({ _id: edge._from }),
      );

      if (this.isNotRoleExist(conflictFrom)) throw new NotFoundException();

      const conflictTo = await this.queryBus.execute(
        new ScopeFindQuery({ _id: edge._to }),
      );

      if (this.isNotScopeExist(conflictTo)) throw new NotFoundException();

      addedScopesToRole.push(edge);
    }

    return addedScopesToRole;
  }

  async removeScopes(
    edges: RemoveScopesRoleDto[],
  ): Promise<RemoveScopesRoleDto[]> {
    const removedScopesToRole: RemoveScopesRoleDto[] = [];

    for (const edge of edges) {
      const conflictEdge = await this.rolesHasScopeRepository.findAnd({
        ...edge,
      });

      if (this.isNotRoleHasScopeExist(conflictEdge))
        throw new NotFoundException();

      removedScopesToRole.push(conflictEdge);
    }

    return removedScopesToRole;
  }

  private isRoleExist(role: Role): boolean {
    return role ? true : false;
  }

  private isNotRoleHasScopeExist(edge: Edge): boolean {
    return !edge;
  }

  private isNotRoleExist(role: Role): boolean {
    return !role;
  }

  private isNotScopeExist(scope: Scope): boolean {
    return !scope;
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
