import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { IContextGraphQL } from '../../../../../shared/interfaces/context-graphql.interface';
import { CreateRoleHasScopeDto } from '../../dto/roles-has-scope/create-role-has-scope.dto';
import { CreateRoleHasScopeInput } from '../../dto/roles-has-scope/create-role-has-scope.input';

@Injectable({ scope: Scope.REQUEST })
export class CreateRolesHasScopePipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context: IContextGraphQL) {}

  transform(value: CreateRoleHasScopeInput): CreateRoleHasScopeDto[] {
    return value.scopesId.map((scopeId) => ({
      _from: value.roleId,
      _to: scopeId,
      createdAt: Date.now(),
      createdBy: this.context.user._id,
    }));
  }
}
