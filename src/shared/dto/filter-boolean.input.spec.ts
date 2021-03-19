import { Test, TestingModule } from '@nestjs/testing';
import { FilterBooleanInput } from './filter-boolean.input';

describe('FilterBooleanInput', () => {
  let provider: FilterBooleanInput;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterBooleanInput],
    }).compile();

    provider = module.get<FilterBooleanInput>(FilterBooleanInput);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
