import { IEvent } from '@nestjs/cqrs';
import { UserHasRoleCreateDto } from '../../dto/users-has-role/user-has-role-create.dto';

export class UserHasRoleCreatedEvent implements IEvent {
  constructor(public readonly input: UserHasRoleCreateDto) {}
}
