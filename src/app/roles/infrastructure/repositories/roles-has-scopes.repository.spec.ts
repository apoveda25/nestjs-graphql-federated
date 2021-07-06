import { Test, TestingModule } from '@nestjs/testing';
import { RolesHasScopesRepository } from './roles-has-scopes.repository';

describe('RolesHasScopesRepository', () => {
  let provider: RolesHasScopesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesHasScopesRepository],
    }).compile();

    provider = module.get<RolesHasScopesRepository>(RolesHasScopesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
