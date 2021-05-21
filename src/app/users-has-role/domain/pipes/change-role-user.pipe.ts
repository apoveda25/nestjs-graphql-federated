import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { IContextGraphQL } from '../../../../shared/interfaces/context-graphql.interface';
import { ChangeRoleUserDto } from '../dto/change-role-user.dto';
import { ChangeRoleUserInput } from '../dto/change-role-user.input';

@Injectable({ scope: Scope.REQUEST })
export class ChangeRoleUserPipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context: IContextGraphQL) {}

  transform(value: ChangeRoleUserInput): ChangeRoleUserDto {
    return {
      _from: value.userId,
      _to: value.roleId,
      updatedAt: Date.now(),
      updatedBy: this.context.user._id,
    };
  }
}
