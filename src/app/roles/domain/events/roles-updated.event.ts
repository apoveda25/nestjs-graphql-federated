import { IEvent } from '@nestjs/cqrs';
import { UpdateRoleDto } from '../dto/update-role.dto';

export class RolesUpdatedEvent implements IEvent {
  constructor(public readonly roles: UpdateRoleDto[]) {}
}
