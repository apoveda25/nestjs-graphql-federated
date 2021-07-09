import { IEvent } from '@nestjs/cqrs';
import { CreateRoleHasScopeDto } from '../../dto/roles-has-scope/create-role-has-scope.dto';

export class RolesHasScopeCreatedEvent implements IEvent {
  constructor(public readonly input: CreateRoleHasScopeDto[]) {}
}
