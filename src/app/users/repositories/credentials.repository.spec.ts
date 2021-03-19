import { Test, TestingModule } from '@nestjs/testing';
import { CredentialsRepository } from './credentials.repository';

describe('CredentialsRepository', () => {
  let provider: CredentialsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredentialsRepository],
    }).compile();

    provider = module.get<CredentialsRepository>(CredentialsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
