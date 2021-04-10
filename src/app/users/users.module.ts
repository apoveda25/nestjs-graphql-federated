import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RolesModule } from '../roles/roles.module';
import { ScopesModule } from '../scopes/scopes.module';
import { UsersCommandHandlers } from './commands/handlers/index';
import { UsersEventHandlers } from './events/handlers/index';
import { UserModel } from './models/user.model';
import { UsersQueryHandlers } from './queries/handlers/index';
import { UsersHasRoleRepository } from './repositories/users-has-role.repository';
import { UsersRepository } from './repositories/users.repository';
import { UsersSagas } from './sagas/users.saga';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [CqrsModule, RolesModule, ScopesModule],
  providers: [
    UsersResolver,
    ...UsersQueryHandlers,
    ...UsersCommandHandlers,
    ...UsersEventHandlers,
    UsersSagas,
    UsersRepository,
    UserModel,
    UsersHasRoleRepository,
  ],
})
export class UsersModule {}
