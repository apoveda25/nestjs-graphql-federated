import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { IScopeDeleteConflits } from '../../../../app/scopes/domain/interfaces/scope.interfaces';
import { Role } from '../../../roles/domain/entities/role.entity';
import { CreateScopeDto } from '../dto/create-scope.dto';
import { DeleteScopeDto } from '../dto/delete-scope.dto';
import { Scope } from '../entities/scope.entity';
import { IScopeCreateConflits } from '../interfaces/scope.interfaces';

@Injectable()
export class ScopeModel {
  create(
    scope: CreateScopeDto,
    { conflictKeyName }: IScopeCreateConflits,
  ): CreateScopeDto {
    if (this.isScopeExist(conflictKeyName)) throw new GraphQLError('Conflict');

    return scope;
  }

  delete(
    scope: DeleteScopeDto,
    { conflictKey, conflictInEdgesRoles }: IScopeDeleteConflits,
  ): DeleteScopeDto {
    if (this.isScopeNotExist(conflictKey)) throw new GraphQLError('Not Found');

    if (this.isScopeVertexHasIncomingEdges(conflictInEdgesRoles))
      throw new GraphQLError('Conflict');

    return scope;
  }

  private isScopeExist(scope: Scope): boolean {
    return scope ? true : false;
  }

  private isScopeNotExist(scope: Scope): boolean {
    return scope ? false : true;
  }

  private isScopeVertexHasIncomingEdges(vertexes: Role[]): boolean {
    return vertexes.length ? true : false;
  }
}
