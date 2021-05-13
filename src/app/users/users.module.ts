import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../../shared/shared.module';
import { UsersCommandHandlers } from './application/commands/handlers/index';
import { UsersEventHandlers } from './application/events';
import { UsersQueryHandlers } from './application/queries/handlers/index';
import { UsersSagas } from './application/sagas/users.saga';
import { UserModel } from './domain/models/user.model';
import { UsersRepository } from './infrastructure/repositories/users.repository';
import { UsersResolver } from './infrastructure/users.resolver';

@Module({
  imports: [CqrsModule, SharedModule],
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
