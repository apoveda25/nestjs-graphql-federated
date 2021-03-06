import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../../shared/shared.module';
import { RolesCommandHandlers } from './application/commands/handlers/index';
import { RolesEventHandlers } from './application/events/index';
import { RolesQueryHandlers } from './application/queries/handlers/index';
import { RoleModel } from './domain/models/role.model';
import { RolesHasScopeModel } from './domain/models/roles-has-scope.model';
import { RolesHasScopesRepository } from './infrastructure/repositories/roles-has-scopes.repository';
import { RolesRepository } from './infrastructure/repositories/roles.repository';
import { RolesResolver } from './infrastructure/roles.resolver';

@Module({
  imports: [CqrsModule, SharedModule],
  providers: [
    RolesResolver,
    ...RolesQueryHandlers,
    ...RolesCommandHandlers,
    ...RolesEventHandlers,
    RolesRepository,
    RoleModel,
    RolesHasScopesRepository,
    RolesHasScopeModel,
  ],
})
export class RolesModule {}
