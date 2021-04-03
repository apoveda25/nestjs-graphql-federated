import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScopesRepository } from '../../repositories/scopes.repository';
import { ScopeCreatedEvent } from '../impl/scope-created.event';

@EventsHandler(ScopeCreatedEvent)
export class ScopeCreatedEventHandler
  implements IEventHandler<ScopeCreatedEvent> {
  constructor(private readonly scopesRepository: ScopesRepository) {}

  async handle(event: ScopeCreatedEvent) {
    return await this.scopesRepository.create([event.input]);
  }
}
