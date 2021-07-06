import { IEvent } from '@nestjs/cqrs';
import { DeleteRoleHasScopeDto } from '../../dto/roles-has-scope/delete-role-has-scope.dto';

export class RolesHasScopeDeletedEvent implements IEvent {
  constructor(public readonly input: DeleteRoleHasScopeDto[]) {}
}
