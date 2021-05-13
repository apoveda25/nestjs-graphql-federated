import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../../shared/shared.module';
import { UsersHasRoleCommandHandlers } from './application/commands/handlers/index';
import { UsersHasRoleEventHandlers } from './application/events/index';
import { UsersHasRoleQueryHandlers } from './application/queries/handlers';
import { UsersHasRoleModel } from './domain/models/users-has-role.model';
import { UsersHasRoleRepository } from './infrastructure/repositories/users-has-role.repository';

@Module({
  imports: [CqrsModule, SharedModule],
  providers: [
    ...UsersHasRoleQueryHandlers,
    ...UsersHasRoleCommandHandlers,
    ...UsersHasRoleEventHandlers,
    UsersHasRoleRepository,
    UsersHasRoleModel,
  ],
})
export class UsersHasRoleModule {}
