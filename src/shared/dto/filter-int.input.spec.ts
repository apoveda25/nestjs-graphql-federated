import { Test, TestingModule } from '@nestjs/testing';
import { FilterIntInput } from './filter-int.input';

describe('FilterIntInput', () => {
  let provider: FilterIntInput;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterIntInput],
    }).compile();

    provider = module.get<FilterIntInput>(FilterIntInput);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
