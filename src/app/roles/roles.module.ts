import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { CqrsModule } from '@nestjs/cqrs';
import { ScopesModule } from '../scopes/scopes.module';
import { RolesCommandHandlers } from './commands/handlers/index';
import { RolesEventHandlers } from './events/handlers/index';
import { RoleModel } from './models/role.model';
import { RolesQueryHandlers } from './queries/handlers/index';
import { RolesHasScopeRepository } from './repositories/roles-has-scope.repository';
import { RolesRepository } from './repositories/roles.repository';
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
  ],
  exports: [RolesRepository],
=======
import { RolesRepository } from './repositories/roles.repository';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './services/roles.service';

@Module({
  providers: [RolesResolver, RolesService, RolesRepository],
>>>>>>> parent of e706196... Merge branch 'release/v0.2.0'
})
export class RolesModule {}
