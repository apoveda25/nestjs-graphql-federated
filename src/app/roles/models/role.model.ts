import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IEdge } from '../../../shared/interfaces/edge.interface';
import { Scope } from '../../scopes/entities/scope.entity';
import { AddScopesRoleDto } from '../dto/add-scopes-role.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { DeleteRoleDto } from '../dto/delete-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';
import {
  IRoleAddScopesConflicts,
  IRoleCreateConflits,
  IRoleDeleteConflits,
  IRoleUpdateConflits,
} from '../interfaces/role.interfaces';

@Injectable()
export class RoleModel {
  create(role: CreateRoleDto, { withKey }: IRoleCreateConflits): Role {
    if (this.isRoleExist(withKey)) throw new ConflictException();

    return role;
  }

  update(
    role: UpdateRoleDto,
    { withKey, withName, withDefault }: IRoleUpdateConflits,
  ): Role {
    if (this.isNotRoleExist(withKey)) throw new NotFoundException();

    if (this.isThereAnotherRoleWithTheSameName(withName, role))
      throw new ConflictException();

    if (this.isThereAnotherDefaultRole(withDefault))
      throw new ConflictException();

    return { ...withKey, ...role };
  }

  delete(
    role: DeleteRoleDto,
    { withKey, withEdges }: IRoleDeleteConflits,
  ): Role {
    if (this.isNotRoleExist(withKey)) throw new NotFoundException();

    if (this.haveEdgeConnections(withEdges)) throw new ConflictException();

    return { ...withKey, ...role };
  }

  addScope(
    edge: AddScopesRoleDto,
    { withFrom, withTo }: IRoleAddScopesConflicts,
  ): AddScopesRoleDto {
    if (this.isNotRoleExist(withFrom)) throw new NotFoundException();

    if (this.isNotScopeExist(withTo)) throw new NotFoundException();

    return edge;
  }

  private isRoleExist(role: Role): boolean {
    return role ? true : false;
  }

  private isNotRoleExist(role: Role): boolean {
    return !role;
  }

  private isNotScopeExist(scope: Scope): boolean {
    return !scope;
  }

  private isThereAnotherRoleWithTheSameName(
    roleConflict: Role,
    role: UpdateRoleDto,
  ): boolean {
    return roleConflict && roleConflict._key !== role._key;
  }

  private isThereAnotherDefaultRole(roleConflict: Role): boolean {
    return roleConflict ? true : false;
  }

  private haveEdgeConnections(roleConflict: IEdge[]): boolean {
    return roleConflict.length ? true : false;
  }
}
