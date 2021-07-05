import { IEvent } from '@nestjs/cqrs';
import { DeleteScopeDto } from '../dto/delete-scope.dto';

export class ScopesDeletedEvent implements IEvent {
  constructor(public readonly input: DeleteScopeDto[]) {}
}
