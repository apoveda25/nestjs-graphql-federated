import { IEvent } from '@nestjs/cqrs';
import { AddRoleUserDto } from '../../domain/dto/add-role-user.dto';

export class UserAddedRoleEvent implements IEvent {
  constructor(public readonly input: AddRoleUserDto) {}
}
