import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { IContextGraphQL } from '../../../../shared/interfaces/context-graphql.interface';
import { AddScopesRoleDto } from '../../domain/dto/add-scopes-role.dto';
import { AddScopesRoleInput } from '../../domain/dto/add-scopes-role.input';

@Injectable({ scope: Scope.REQUEST })
export class AddScopesRolePipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context: IContextGraphQL) {}

  transform(value: AddScopesRoleInput): AddScopesRoleDto[] {
    return value.scopesId.map((scopeId) => ({
      _from: value.roleId,
      _to: scopeId,
      createdAt: Date.now(),
      createdBy: this.context.user._id,
    }));
  }
}
