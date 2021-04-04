import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IEdge } from '../../../shared/interfaces/edge.interface';
import { CreateRoleDto } from '../dto/create-role.dto';
import { DeleteRoleDto } from '../dto/delete-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';
import {
  IRoleDeleteConflits,
  IRoleUpdateConflits,
} from '../interfaces/role.interfaces';

@Injectable()
export class RoleModel {
  create(role: CreateRoleDto, roleConflict: Role): Role {
    if (roleConflict) throw new ConflictException();

    return role;
  }

  update(role: UpdateRoleDto, roleConflicts: IRoleUpdateConflits): Role {
    if (this.isNotRoleExist(roleConflicts.withKey))
      throw new NotFoundException();

    if (this.isThereAnotherRoleWithTheSameName(roleConflicts.withName, role))
      throw new ConflictException();

    if (this.isThereAnotherDefaultRole(roleConflicts.withDefault))
      throw new ConflictException();

    return { ...roleConflicts.withKey, ...role };
  }

  delete(role: DeleteRoleDto, roleConflicts: IRoleDeleteConflits): Role {
    if (this.isNotRoleExist(roleConflicts.withKey))
      throw new NotFoundException();

    if (this.haveEdgeConnections(roleConflicts.withEdges))
      throw new ConflictException();

    return { ...roleConflicts.withKey, ...role };
  }

  private isNotRoleExist(roleConflict: Role): boolean {
    return !roleConflict;
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
