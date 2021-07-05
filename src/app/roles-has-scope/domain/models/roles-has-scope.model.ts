import { Injectable } from '@nestjs/common';
import { Edge } from 'arangojs/documents';
import { GraphQLError } from 'graphql';
import { Role } from '../../../roles/domain/entities/role.entity';
import { Scope } from '../../../scopes/domain/entities/scope.entity';
import { AddScopesRoleDto } from '../dto/add-scopes-role.dto';
import { RemoveScopesRoleDto } from '../dto/remove-scopes-role.dto';
import {
  IRoleAddScopesConflicts,
  IRoleRemoveScopesConflicts,
} from '../interfaces/roles-has-scope.interfaces';

@Injectable()
export class RolesHasScopeModel {
  addScopes(
    roleHasScope: AddScopesRoleDto,
    { conflictEdge, conflictFrom, conflictTo }: IRoleAddScopesConflicts,
  ): AddScopesRoleDto {
    if (this.isRoleHasScopeExist(conflictEdge))
      throw new GraphQLError('Conflict');

    if (this.isNotRoleExist(conflictFrom)) throw new GraphQLError('Not Found');

    if (this.isNotScopeExist(conflictTo)) throw new GraphQLError('Not Found');

    return roleHasScope;
  }

  removeScopes(
    roleHasScope: RemoveScopesRoleDto,
    { conflictEdge }: IRoleRemoveScopesConflicts,
  ): RemoveScopesRoleDto {
    if (this.isNotRoleHasScopeExist(conflictEdge))
      throw new GraphQLError('Not Found');

    return roleHasScope;
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
