import { Test, TestingModule } from '@nestjs/testing';
import { FilterKeyInput } from './filter-key.input';

describe('FilterKeyInput', () => {
  let provider: FilterKeyInput;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterKeyInput],
    }).compile();

    provider = module.get<FilterKeyInput>(FilterKeyInput);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
