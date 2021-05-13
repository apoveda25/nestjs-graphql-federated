import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../../shared/shared.module';
import { RolesHasScopeCommandHandlers } from './application/commands/handlers/index';
import { RolesHasScopeEventHandlers } from './application/events/index';
import { RolesHasScopeQueryHandlers } from './application/queries/handlers/index';
import { RolesHasScopeModel } from './domain/models/roles-has-scope.model';
import { RolesHasScopeRepository } from './infrastructure/repositories/roles-has-scope.repository';

@Module({
  imports: [CqrsModule, SharedModule],
  providers: [
    ...RolesHasScopeQueryHandlers,
    ...RolesHasScopeCommandHandlers,
    ...RolesHasScopeEventHandlers,
    RolesHasScopeModel,
    RolesHasScopeRepository,
  ],
})
export class RolesHasScopeModule {}
