import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ScopesCommandHandlers } from './commands/handlers/index';
import { ScopesEventHandlers } from './events/handlers/index';
import { ScopesRepository } from './repositories/scopes.repository';
import { ScopesResolver } from './scopes.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    ScopesResolver,
    ...ScopesCommandHandlers,
    ...ScopesEventHandlers,
    ScopesRepository,
  ],
})
export class ScopesModule {}
