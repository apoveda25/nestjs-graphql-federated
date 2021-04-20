import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScopeCreatedEvent } from '../../domain/events/scope-created.event';
import { ScopesRepository } from '../../infrastructure/repositories/scopes.repository';

@EventsHandler(ScopeCreatedEvent)
export class ScopeCreatedEventHandler
  implements IEventHandler<ScopeCreatedEvent> {
  constructor(private readonly scopesRepository: ScopesRepository) {}

  async handle(event: ScopeCreatedEvent) {
    return await this.scopesRepository.create([event.input]);
  }
}
