import { IEvent } from '@nestjs/cqrs';
import { CreateScopeDto } from '../../dto/create-scope.dto';

export class ScopeCreatedEvent implements IEvent {
  constructor(public readonly input: CreateScopeDto) {}
}
