import { Test, TestingModule } from '@nestjs/testing';
import { ObjectToAql } from './object-to-aql';

describe('ObjectToAql', () => {
  let provider: ObjectToAql;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObjectToAql],
    }).compile();

    provider = module.get<ObjectToAql>(ObjectToAql);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
