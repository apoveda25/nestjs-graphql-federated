import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersCommandHandlers } from './commands/handlers/index';
import { UsersEventHandlers } from './events/handlers/index';
import { UserModel } from './models/user.model';
import { UsersQueryHandlers } from './queries/handlers/index';
import { UsersRepository } from './repositories/users.repository';
import { UsersSagas } from './sagas/users.saga';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    UsersResolver,
    ...UsersQueryHandlers,
    ...UsersCommandHandlers,
    ...UsersEventHandlers,
    UsersSagas,
    UsersRepository,
    UserModel,
  ],
})
export class UsersModule {}
