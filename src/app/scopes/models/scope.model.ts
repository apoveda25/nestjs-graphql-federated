import { Injectable } from '@nestjs/common';
import { CreateScopeDto } from '../dto/create-scope.dto';
import { Scope } from '../entities/scope.entity';

@Injectable()
export class ScopeModel {
  create(scope: CreateScopeDto, scopeConflict: Scope): CreateScopeDto {
    return scopeConflict ? null : scope;
  }
}
