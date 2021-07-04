import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { IContextGraphQL } from '../../../../shared/interfaces/context-graphql.interface';
import { CreateScopeDto } from '../dto/create-scope.dto';
import { CreateScopeInput } from '../dto/create-scope.input';

@Injectable({ scope: Scope.REQUEST })
export class CreateScopePipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context: IContextGraphQL) {}

  transform(scope: CreateScopeInput): CreateScopeDto {
    return {
      _id: `Scopes/${scope._key}`,
      ...scope,
      name: `${scope.action.toLowerCase()}_${scope.collection.toLowerCase()}`,
      createdBy: this.context.user._id,
      updatedBy: null,
      createdAt: Date.now(),
      updatedAt: null,
    };
  }
}
