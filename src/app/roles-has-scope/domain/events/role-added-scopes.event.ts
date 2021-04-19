import { IEvent } from '@nestjs/cqrs';
import { AddScopesRoleDto } from '../../domain/dto/add-scopes-role.dto';

export class RoleAddedScopesEvent implements IEvent {
  constructor(public readonly input: AddScopesRoleDto[]) {}
}
