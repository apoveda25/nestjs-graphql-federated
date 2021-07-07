import { IEvent } from '@nestjs/cqrs';
import { UserHasRoleUpdateDto } from '../../dto/users-has-role/user-has-role-update.dto';

export class UsersHasRoleUpdatedEvent implements IEvent {
  constructor(public readonly input: UserHasRoleUpdateDto) {}
}
