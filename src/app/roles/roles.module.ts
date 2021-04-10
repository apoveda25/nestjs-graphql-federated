import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ScopesModule } from '../scopes/scopes.module';
import { RolesCommandHandlers } from './commands/handlers/index';
import { RolesEventHandlers } from './events/handlers/index';
import { RoleModel } from './models/role.model';
import { RolesQueryHandlers } from './queries/handlers/index';
import { RolesHasScopeRepository } from './repositories/roles-has-scope.repository';
import { RolesRepository } from './repositories/roles.repository';
import { UsersHasRoleRepository } from './repositories/users-has-role.repository';
import { RolesResolver } from './roles.resolver';

@Module({
  imports: [CqrsModule, ScopesModule],
  providers: [
    RolesResolver,
    ...RolesQueryHandlers,
    ...RolesCommandHandlers,
    ...RolesEventHandlers,
    RolesRepository,
    RoleModel,
    RolesHasScopeRepository,
    UsersHasRoleRepository,
  ],
  exports: [RolesRepository],
})
export class RolesModule {}
