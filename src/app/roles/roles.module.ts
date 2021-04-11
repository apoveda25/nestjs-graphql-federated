import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RolesCommandHandlers } from './commands/handlers/index';
import { RolesEventHandlers } from './events/handlers/index';
import { RoleModel } from './models/role.model';
import { RolesQueryHandlers } from './queries/handlers/index';
import { RolesHasScopeRepository } from './repositories/roles-has-scope.repository';
import { RolesRepository } from './repositories/roles.repository';
import { RolesResolver } from './roles.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    RolesResolver,
    ...RolesQueryHandlers,
    ...RolesCommandHandlers,
    ...RolesEventHandlers,
    RolesRepository,
    RoleModel,
    RolesHasScopeRepository,
  ],
  exports: [RolesRepository],
})
export class RolesModule {}
