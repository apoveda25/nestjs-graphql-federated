import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScopesCreatedEvent } from '../../domain/events/scopes-created.event';
import { ScopesRepository } from '../../infrastructure/repositories/scopes.repository';

@EventsHandler(ScopesCreatedEvent)
export class ScopesCreatedEventHandler
  implements IEventHandler<ScopesCreatedEvent> {
  constructor(private readonly scopesRepository: ScopesRepository) {}

  async handle({ input }: ScopesCreatedEvent) {
    return await this.scopesRepository.create(input);
  }
}
