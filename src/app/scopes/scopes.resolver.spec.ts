import { Test, TestingModule } from '@nestjs/testing';
import { ScopesResolver } from './scopes.resolver';
// import { ScopesService } from './scopes.service';

describe('ScopesResolver', () => {
  let resolver: ScopesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // providers: [ScopesResolver, ScopesService],
      providers: [ScopesResolver],
    }).compile();

    resolver = module.get<ScopesResolver>(ScopesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
