import { IEvent } from '@nestjs/cqrs';
import { ChangeRoleUserDto } from '../dto/change-role-user.dto';

export class UserChangedRoleEvent implements IEvent {
  constructor(public readonly input: ChangeRoleUserDto) {}
}
