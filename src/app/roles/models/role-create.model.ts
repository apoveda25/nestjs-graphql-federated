import { ConflictException } from '@nestjs/common';
import { CreateRoleInput } from '../dto/create-role.input';
import { Role } from '../entities/role.entity';

export class RoleCreateModel {
  constructor(private input: CreateRoleInput) {}

  create(role: Role[]) {
    if (role.length) throw new ConflictException();
  }

  // commit(eventEmitter: EventEmitter2, event: CreateRoleInput) {
  //   eventEmitter.emit('role.created', event);
  // }
  commit(event: CreateRoleInput) {
    // eventEmitter.emit('role.created', event);
  }
}
