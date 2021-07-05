import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScopesDeletedEvent } from '../../domain/events/scopes-deleted.event';
import { ScopesRepository } from '../../infrastructure/repositories/scopes.repository';

@EventsHandler(ScopesDeletedEvent)
export class ScopesDeletedEventHandler
  implements IEventHandler<ScopesDeletedEvent> {
  constructor(private readonly scopesRepository: ScopesRepository) {}

  async handle({ input }: ScopesDeletedEvent) {
    return await this.scopesRepository.delete(input);
  }
}
