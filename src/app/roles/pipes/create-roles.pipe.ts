import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { CreateRoleInput } from '../dto/create-role.input';

@Injectable({ scope: Scope.REQUEST })
export class CreateRolesPipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context) {}

  transform(value: CreateRoleInput[]) {
    return value.map(({ role }) => ({
      role: {
        ...role,
        _key: role._id.split('/')[1],
        default: false,
        createdBy: this.context.user._id,
        updatedBy: '',
        createdAt: Date.now(),
        updatedAt: 0,
      },
    }));
  }
}
