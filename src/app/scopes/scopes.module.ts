import { Module } from '@nestjs/common';
import { ScopesService } from './scopes.service';
import { ScopesResolver } from './scopes.resolver';

@Module({
  providers: [ScopesResolver, ScopesService]
})
export class ScopesModule {}
