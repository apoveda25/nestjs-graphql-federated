import { Test, TestingModule } from '@nestjs/testing';
import { FilterFloatInput } from './filter-float.input';

describe('FilterFloatInput', () => {
  let provider: FilterFloatInput;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterFloatInput],
    }).compile();

    provider = module.get<FilterFloatInput>(FilterFloatInput);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
