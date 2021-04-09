import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RolesModule } from '../roles/roles.module';
import { ScopesModule } from '../scopes/scopes.module';
import { UsersCommandHandlers } from './commands/handlers/index';
import { UsersEventHandlers } from './events/handlers/index';
import { UserModel } from './models/user.model';
import { CredentialsRepository } from './repositories/credentials.repository';
import { UsersRepository } from './repositories/users.repository';
import { UsersResolver } from './users.resolver';
import { UsersHasRoleRepository } from './repositories/users-has-role.repository';

@Module({
  imports: [CqrsModule, RolesModule, ScopesModule],
  providers: [
    UsersResolver,
    // ...UsersQueryHandlers,
    ...UsersCommandHandlers,
    ...UsersEventHandlers,
    UsersRepository,
    UserModel,
    CredentialsRepository,
    UsersHasRoleRepository,
  ],
})
export class UsersModule {}
