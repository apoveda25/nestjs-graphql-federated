import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { IContextGraphQL } from '../../../shared/interfaces/context-graphql.interface';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { UpdateRoleInput } from '../dto/update-role.input';

@Injectable({ scope: Scope.REQUEST })
export class UpdateRolesPipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context: IContextGraphQL) {}

  transform(roles: UpdateRoleInput[]): UpdateRoleDto[] {
    return roles.map((role) => ({
      _id: `Roles/${role._key}`,
      ...role,
      updatedAt: Date.now(),
      updatedBy: this.context.user._id,
    }));
  }
}
