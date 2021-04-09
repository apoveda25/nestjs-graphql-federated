import { Test, TestingModule } from '@nestjs/testing';
import { RolesRepository } from './roles.repository';

describe('RolesRepository', () => {
  let provider: RolesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesRepository],
    }).compile();

    provider = module.get<RolesRepository>(RolesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
