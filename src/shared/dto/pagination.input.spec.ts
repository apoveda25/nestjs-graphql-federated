import { Test, TestingModule } from '@nestjs/testing';
import { PaginationInput } from './pagination.input';

describe('PaginationInput', () => {
  let provider: PaginationInput;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationInput],
    }).compile();

    provider = module.get<PaginationInput>(PaginationInput);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
