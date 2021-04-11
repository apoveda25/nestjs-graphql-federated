import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RolesHasScopeCommandHandlers } from './commands/handlers/index';
import { RolesHasScopeEventHandlers } from './events/handlers/index';
import { RolesHasScopeModel } from './models/roles-has-scope.model';
import { RolesHasScopeQueryHandlers } from './queries/handlers/index';
import { RolesHasScopeRepository } from './repositories/roles-has-scope.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    ...RolesHasScopeQueryHandlers,
    ...RolesHasScopeCommandHandlers,
    ...RolesHasScopeEventHandlers,
    RolesHasScopeModel,
    RolesHasScopeRepository,
  ],
})
export class RolesHasScopeModule {}
