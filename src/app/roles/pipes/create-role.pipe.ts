import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { IContextGraphQL } from '../../../shared/interfaces/context-graphql.interface';
import { CreateRoleDto } from '../dto/create-role.dto';
import { CreateRoleInput } from '../dto/create-role.input';

@Injectable({ scope: Scope.REQUEST })
export class CreateRolePipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context: IContextGraphQL) {}

  transform(role: CreateRoleInput): CreateRoleDto {
    return {
      _id: `Roles/${role._key}`,
      ...role,
      default: false,
      createdBy: this.context.user._id,
      updatedBy: '',
      createdAt: Date.now(),
      updatedAt: 0,
    };
  }
}
