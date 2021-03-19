import { Module } from '@nestjs/common';
import { CredentialsRepository } from './repositories/credentials.repository';
import { RolesRepository } from './repositories/roles.repository';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [
    UsersResolver,
    UsersService,
    UsersRepository,
    CredentialsRepository,
    RolesRepository,
  ],
})
export class UsersModule {}
