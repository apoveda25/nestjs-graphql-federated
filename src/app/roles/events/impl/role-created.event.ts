import { IEvent } from '@nestjs/cqrs';
import { CreateRoleDto } from '../../dto/create-role.dto';

export class RoleCreatedEvent implements IEvent {
  constructor(public readonly role: CreateRoleDto) {}
}
