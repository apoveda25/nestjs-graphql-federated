import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { IContextGraphQL } from '../../../shared/interfaces/context-graphql.interface';
import { DeleteRoleDto } from '../dto/delete-role.dto';
import { DeleteRoleInput } from '../dto/delete-role.input';

@Injectable({ scope: Scope.REQUEST })
export class DeleteRolesPipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context: IContextGraphQL) {}

  transform(roles: DeleteRoleInput[]): DeleteRoleDto[] {
    return roles.map((role) => ({ _id: `Roles/${role._key}`, ...role }));
  }
}
