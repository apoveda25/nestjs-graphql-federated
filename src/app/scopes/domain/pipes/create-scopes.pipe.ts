import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { collectionsEnum } from 'src/shared/enums/collections.enum';
import { IContextGraphQL } from '../../../../shared/interfaces/context-graphql.interface';
import { CreateScopeDto } from '../dto/create-scope.dto';
import { CreateScopeInput } from '../dto/create-scope.input';

@Injectable({ scope: Scope.REQUEST })
export class CreateScopesPipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context: IContextGraphQL) {}

  transform(scopes: CreateScopeInput[]): CreateScopeDto[] {
    return scopes.map((scope) => ({
      _id: `${collectionsEnum.SCOPES}/${scope._key}`,
      ...scope,
      name: `${scope.collection.toLowerCase()}_${scope.action.toLowerCase()}`,
      createdBy: this.context.user._id,
      updatedBy: null,
      createdAt: Date.now(),
      updatedAt: null,
    }));
  }
}
