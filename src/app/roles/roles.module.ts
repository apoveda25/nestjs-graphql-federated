import { Module } from '@nestjs/common';
import { RolesRepository } from './repositories/roles.repository';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './services/roles.service';

@Module({
  providers: [RolesResolver, RolesService, RolesRepository],
})
export class RolesModule {}
