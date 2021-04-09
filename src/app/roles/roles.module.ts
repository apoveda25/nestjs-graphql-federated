import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RolesCommandHandlers } from './commands/handlers/index';
import { RolesEventHandlers } from './events/handlers/index';
import { RoleModel } from './models/role.model';
import { RolesQueryHandlers } from './queries/handlers/index';
import { RolesRepository } from './repositories/roles.repository';
import { RolesResolver } from './roles.resolver';
import { RolesHasScopeRepository } from './repositories/roles-has-scope.repository';

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
})
export class RolesModule {}
