import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRoleInput } from '../dto/create-role.input';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleModel {
  create(role: CreateRoleInput, roleConflict: Role) {
    if (roleConflict) throw new ConflictException();

    return role;
  }
}
