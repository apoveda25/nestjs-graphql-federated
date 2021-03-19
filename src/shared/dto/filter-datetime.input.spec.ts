import { Test, TestingModule } from '@nestjs/testing';
import { FilterDatetimeInput } from './filter-datetime.input';

describe('FilterDatetimeInput', () => {
  let provider: FilterDatetimeInput;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterDatetimeInput],
    }).compile();

    provider = module.get<FilterDatetimeInput>(FilterDatetimeInput);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
