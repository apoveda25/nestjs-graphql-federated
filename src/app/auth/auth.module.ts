import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthCommandHandlers } from './application/commands/handlers/index';
import { AuthEventHandlers } from './application/events/index';
import { AuthModel } from './domain/models/auth.model';
import { AuthResolver } from './infrastructure/auth.resolver';
import { AuthRepository } from './infrastructure/repositories/auth.repository';

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
