import { Injectable } from '@nestjs/common';
import { Edge } from 'arangojs/documents';
import { GraphQLError } from 'graphql';
import { Role } from '../../../roles/domain/entities/role.entity';
import { Scope } from '../../../scopes/domain/entities/scope.entity';
import { CreateRoleHasScopeDto } from '../dto/roles-has-scope/create-role-has-scope.dto';
import { DeleteRoleHasScopeDto } from '../dto/roles-has-scope/delete-role-has-scope.dto';
import {
  IRoleHasScopeCreateConflicts,
  IRoleHasScopeDeleteConflicts,
} from '../interfaces/roles-has-scope.interfaces';

@Injectable()
export class RolesHasScopeModel {
  createScopes(
    createRoleHasScopeDto: CreateRoleHasScopeDto,
    { conflictEdge, conflictFrom, conflictTo }: IRoleHasScopeCreateConflicts,
  ): CreateRoleHasScopeDto {
    if (this.isRoleHasScopeExist(conflictEdge))
      throw new GraphQLError('Conflict');

    if (this.isNotRoleExist(conflictFrom)) throw new GraphQLError('Not Found');

    if (this.isNotScopeExist(conflictTo)) throw new GraphQLError('Not Found');

    return createRoleHasScopeDto;
  }

  deleteScopes(
    deleteRoleHasScopeDto: DeleteRoleHasScopeDto,
    { conflictEdge }: IRoleHasScopeDeleteConflicts,
  ): DeleteRoleHasScopeDto {
    if (this.isNotRoleHasScopeExist(conflictEdge))
      throw new GraphQLError('Not Found');

    return deleteRoleHasScopeDto;
  }

  private isNotRoleHasScopeExist(edge: Edge): boolean {
    return !edge;
  }

  private isRoleHasScopeExist(edge: Edge): boolean {
    return edge ? true : false;
  }

  private isNotRoleExist(role: Role): boolean {
    return !role;
  }

  private isNotScopeExist(scope: Scope): boolean {
    return !scope;
  }
}
