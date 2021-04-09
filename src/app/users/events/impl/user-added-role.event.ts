import { IEvent } from '@nestjs/cqrs';
import { AddRoleUserDto } from '../../dto/add-role-user.dto';

export class UserAddedRoleEvent implements IEvent {
  constructor(public readonly edge: AddRoleUserDto) {}
}
