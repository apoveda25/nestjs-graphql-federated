import { ConflictException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CreateScopeDto } from '../dto/create-scope.dto';
import { Scope } from '../entities/scope.entity';
import { ScopeFindQuery } from '../queries/impl/scope-find.query';

@Injectable()
export class ScopeModel {
  constructor(private readonly queryBus: QueryBus) {}

  async create(scopes: CreateScopeDto[]): Promise<CreateScopeDto[]> {
    const scopesCreated: Scope[] = [];

    for (const scope of scopes) {
      const conflictKeyName = await this.queryBus.execute(
        new ScopeFindQuery({ _key: scope._key, name: scope.name }),
      );

      if (this.isScopeExist(conflictKeyName)) throw new ConflictException();

      scopesCreated.push(scope);
    }

    return scopesCreated;
  }

  private isScopeExist(scope: Scope): boolean {
    return scope ? true : false;
  }
}
