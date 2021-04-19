import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Edge } from 'arangojs/documents';
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
  constructor(private readonly queryBus: QueryBus) {}

  async addScopes(
    roleHasScope: AddScopesRoleDto,
    { conflictEdge, conflictFrom, conflictTo }: IRoleAddScopesConflicts,
  ): Promise<AddScopesRoleDto> {
    if (this.isRoleHasScopeExist(conflictEdge)) throw new ConflictException();

    if (this.isNotRoleExist(conflictFrom)) throw new NotFoundException();

    if (this.isNotScopeExist(conflictTo)) throw new NotFoundException();

    return roleHasScope;
  }

  async removeScopes(
    roleHasScope: RemoveScopesRoleDto,
    { conflictEdge }: IRoleRemoveScopesConflicts,
  ): Promise<RemoveScopesRoleDto> {
    if (this.isNotRoleHasScopeExist(conflictEdge))
      throw new NotFoundException();

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
