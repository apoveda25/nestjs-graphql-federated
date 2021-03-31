import { Test, TestingModule } from '@nestjs/testing';
import { ScopesRepository } from './scopes.repository';

describe('ScopesRepository', () => {
  let provider: ScopesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScopesRepository],
    }).compile();

    provider = module.get<ScopesRepository>(ScopesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
