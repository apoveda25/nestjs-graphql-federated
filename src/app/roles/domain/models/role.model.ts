import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
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
    if (this.isRoleExist(conflictKeyName)) throw new GraphQLError('Conflict');

    return role;
  }

  async update(
    role: UpdateRoleDto,
    { conflictKey, conflictName, conflictDefault }: IRoleUpdateConflits,
  ): Promise<Role> {
    if (this.isNotRoleExist(conflictKey)) throw new GraphQLError('Not Found');

    if (this.isThereAnotherRoleWithTheSame(conflictName, role))
      throw new GraphQLError('Conflict');

    if (this.isThereAnotherRoleWithTheSame(conflictDefault, role))
      throw new GraphQLError('Conflict');

    return { ...conflictKey, ...role };
  }

  async delete(
    role: DeleteRoleDto,
    { conflictKey, conflictEdgeOut, conflictEdgeIn }: IRoleDeleteConflits,
  ): Promise<Role> {
    if (this.isNotRoleExist(conflictKey)) throw new GraphQLError('Not Found');

    if (this.haveEdgeConnections(conflictEdgeOut))
      throw new GraphQLError('Bad Request');

    if (this.haveEdgeConnections(conflictEdgeIn))
      throw new GraphQLError('Bad Request');

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
