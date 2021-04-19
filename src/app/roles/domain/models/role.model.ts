import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IEdge } from '../../../../shared/interfaces/edge.interface';
import { CreateRoleDto } from '../dto/create-role.dto';
import { DeleteRoleDto } from '../dto/delete-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';
import {
  IRoleCreateConflits,
  IRoleDeleteConflits,
  IRoleUpdateConflits,
} from '../interfaces/role.interfaces';

@Injectable()
export class RoleModel {
  async create(
    role: CreateRoleDto,
    { conflictKeyName }: IRoleCreateConflits,
  ): Promise<Role> {
    if (this.isRoleExist(conflictKeyName)) throw new ConflictException();

    return role;
  }

  async update(
    role: UpdateRoleDto,
    { conflictKey, conflictName, conflictDefault }: IRoleUpdateConflits,
  ): Promise<Role> {
    if (this.isNotRoleExist(conflictKey)) throw new NotFoundException();

    if (this.isThereAnotherRoleWithTheSame(conflictName, role))
      throw new ConflictException();

    if (this.isThereAnotherRoleWithTheSame(conflictDefault, role))
      throw new ConflictException();

    return { ...conflictKey, ...role };
  }

  async delete(
    role: DeleteRoleDto,
    { conflictKey, conflictEdgeOut, conflictEdgeIn }: IRoleDeleteConflits,
  ): Promise<Role> {
    if (this.isNotRoleExist(conflictKey)) throw new NotFoundException();

    if (this.haveEdgeConnections(conflictEdgeOut))
      throw new BadRequestException();

    if (this.haveEdgeConnections(conflictEdgeIn))
      throw new BadRequestException();

    return { ...conflictKey, ...role };
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
