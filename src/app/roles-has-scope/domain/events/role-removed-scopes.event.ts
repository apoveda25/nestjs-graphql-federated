import { IEvent } from '@nestjs/cqrs';
import { RemoveScopesRoleDto } from '../dto/remove-scopes-role.dto';

export class RoleRemovedScopesEvent implements IEvent {
  constructor(public readonly input: RemoveScopesRoleDto[]) {}
}
