import { Test, TestingModule } from '@nestjs/testing';
import { FilterStringInput } from './filter-string.input';

describe('FilterStringInput', () => {
  let provider: FilterStringInput;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterStringInput],
    }).compile();

    provider = module.get<FilterStringInput>(FilterStringInput);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
