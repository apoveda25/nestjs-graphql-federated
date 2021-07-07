import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { IContextGraphQL } from 'src/shared/interfaces/context-graphql.interface';
import { UserHasRoleUpdateDto } from '../../dto/users-has-role/user-has-role-update.dto';
import { UserHasRoleUpdateInput } from '../../dto/users-has-role/user-has-role-update.input';

@Injectable({ scope: Scope.REQUEST })
export class UpdateUsersHasRolePipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context: IContextGraphQL) {}

  transform(value: UserHasRoleUpdateInput): UserHasRoleUpdateDto {
    return {
      _from: value.userId,
      _to: value.roleId,
      updatedAt: Date.now(),
      updatedBy: this.context.user._id,
    };
  }
}
