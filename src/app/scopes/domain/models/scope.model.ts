import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { CreateScopeDto } from '../dto/create-scope.dto';
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

  private isScopeExist(scope: Scope): boolean {
    return scope ? true : false;
  }
}
