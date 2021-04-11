import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthResolver } from './auth.resolver';
import { AuthCommandHandlers } from './commands/handlers/index';
import { AuthEventHandlers } from './events/handlers/index';
import { AuthModel } from './models/auth.model';
import { AuthRepository } from './repositories/auth.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    AuthResolver,
    ...AuthCommandHandlers,
    ...AuthEventHandlers,
    AuthRepository,
    AuthModel,
  ],
})
export class AuthModule {}
