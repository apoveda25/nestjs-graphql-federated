import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersHasRoleCommandHandlers } from './commands/handlers/index';
import { UsersHasRoleEventHandlers } from './events/handlers/index';
import { UsersHasRoleQueryHandlers } from './queries/handlers';
import { UsersHasRoleRepository } from './repositories/users-has-role.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    ...UsersHasRoleQueryHandlers,
    ...UsersHasRoleCommandHandlers,
    ...UsersHasRoleEventHandlers,
    UsersHasRoleRepository,
  ],
})
export class UsersHasRoleModule {}
