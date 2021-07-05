import { IEvent } from '@nestjs/cqrs';
import { CreateScopeDto } from '../dto/create-scope.dto';

export class ScopesCreatedEvent implements IEvent {
  constructor(public readonly input: CreateScopeDto[]) {}
}
