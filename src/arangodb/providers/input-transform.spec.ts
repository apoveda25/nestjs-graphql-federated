import { Test, TestingModule } from '@nestjs/testing';
import { InputTransform } from './input-transform';

describe('InputTransform', () => {
  let provider: InputTransform;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InputTransform],
    }).compile();

    provider = module.get<InputTransform>(InputTransform);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
