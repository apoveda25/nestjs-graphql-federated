import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { CreateRoleInput } from '../dto/create-role.input';
import { Role } from '../entities/role.entity';
import { RolesRepository } from '../repositories/roles.repository';

@Injectable({ scope: Scope.REQUEST })
export class CreateRolesPipe implements PipeTransform {
  constructor(
    @Inject(CONTEXT) private readonly context,
    private readonly rolesRepository: RolesRepository,
  ) {}

  transform(role: CreateRoleInput): Role {
    return {
      _id: `${this.rolesRepository.name}/${role._key}`,
      ...role,
      default: false,
      createdBy: this.context.user._id,
      updatedBy: '',
      createdAt: Date.now(),
      updatedAt: 0,
    };
  }
}
