import { Test, TestingModule } from '@nestjs/testing';
import { UsersHasRoleRepository } from './users-has-role.repository';

describe('UsersHasRoleRepository', () => {
  let provider: UsersHasRoleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersHasRoleRepository],
    }).compile();

    provider = module.get<UsersHasRoleRepository>(UsersHasRoleRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
