import { Injectable } from '@nestjs/common';
import { CreateScopeDto } from '../dto/create-scope.dto';
import { Scope } from '../entities/scope.entity';
import { IScopeCreateConflits } from '../interfaces/scope.interfaces';

@Injectable()
export class ScopeModel {
  async create(
    scope: CreateScopeDto,
    { conflictKeyName }: IScopeCreateConflits,
  ): Promise<CreateScopeDto> {
    if (this.isScopeExist(conflictKeyName)) return null;

    return scope;
  }

  private isScopeExist(scope: Scope): boolean {
    return scope ? true : false;
  }
}
