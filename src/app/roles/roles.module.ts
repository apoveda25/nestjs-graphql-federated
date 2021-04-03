import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RolesCommandHandlers } from './commands/handlers/index';
import { RolesEventHandlers } from './events/handlers/index';
import { RoleModel } from './models/role.model';
import { RolesRepository } from './repositories/roles.repository';
import { RolesResolver } from './roles.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    RolesResolver,
    // ...RolesQueryHandlers,
    ...RolesCommandHandlers,
    ...RolesEventHandlers,
    RolesRepository,
    RoleModel,
  ],
})
export class RolesModule {}
