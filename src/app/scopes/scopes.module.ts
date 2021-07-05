import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../../shared/shared.module';
import { ScopesCommandHandlers } from './application/commands/handlers/index';
import { ScopesEventHandlers } from './application/events/index';
import { ScopesQueryHandlers } from './application/queries/handlers/index';
import { ScopeModel } from './domain/models/scope.model';
import { ScopesRepository } from './infrastructure/repositories/scopes.repository';
import { ScopesResolver } from './infrastructure/scopes.resolver';
import { RolesHasScopesRepository } from './infrastructure/repositories/roles-has-scopes.repository';

@Module({
  imports: [CqrsModule, SharedModule],
  providers: [
    ScopesResolver,
    ...ScopesQueryHandlers,
    ...ScopesCommandHandlers,
    ...ScopesEventHandlers,
    ScopesRepository,
    ScopeModel,
    RolesHasScopesRepository,
  ],
})
export class ScopesModule {}
