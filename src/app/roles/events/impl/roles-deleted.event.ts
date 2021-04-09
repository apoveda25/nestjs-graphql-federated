import { IEvent } from '@nestjs/cqrs';
import { DeleteRoleDto } from '../../dto/delete-role.dto';

export class RolesDeletedEvent implements IEvent {
  constructor(public readonly roles: DeleteRoleDto[]) {}
}
