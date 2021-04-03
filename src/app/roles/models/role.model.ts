import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleModel {
  create(role: CreateRoleDto, roleConflict: Role) {
    if (roleConflict) throw new ConflictException();

    return role;
  }
}
