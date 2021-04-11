import { IEvent } from '@nestjs/cqrs';
import { AddScopesRoleDto } from '../../dto/add-scopes-role.dto';

export class RoleAddedScopesEvent implements IEvent {
  constructor(public readonly input: AddScopesRoleDto[]) {}
}
