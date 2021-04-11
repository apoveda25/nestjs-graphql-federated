import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Edge } from 'arangojs/documents';
import { RoleFindQuery } from 'src/app/roles/queries/impl/role-find.query';
import { Role } from '../../roles/entities/role.entity';
import { Scope } from '../../scopes/entities/scope.entity';
import { ScopeFindQuery } from '../../scopes/queries/impl/scope-find.query';
import { AddScopesRoleDto } from '../dto/add-scopes-role.dto';
import { RemoveScopesRoleDto } from '../dto/remove-scopes-role.dto';
import { RoleHasScopeFindAndQuery } from '../queries/impl/role-has-scope-find-and.query';

@Injectable()
export class RolesHasScopeModel {
  constructor(private readonly queryBus: QueryBus) {}

  async addScopes(edges: AddScopesRoleDto[]): Promise<AddScopesRoleDto[]> {
    const addedScopesToRole: AddScopesRoleDto[] = [];

    for (const edge of edges) {
      const conflictEdge = await this.queryBus.execute(
        new RoleHasScopeFindAndQuery({ _from: edge._from, _to: edge._to }),
      );

      if (this.isRoleHasScopeExist(conflictEdge)) throw new ConflictException();

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
      const conflictEdge = await this.queryBus.execute(
        new RoleHasScopeFindAndQuery({ ...edge }),
      );

      if (this.isNotRoleHasScopeExist(conflictEdge))
        throw new NotFoundException();

      removedScopesToRole.push(conflictEdge);
    }

    return removedScopesToRole;
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
