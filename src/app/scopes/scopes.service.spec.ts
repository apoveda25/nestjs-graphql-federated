import { Test, TestingModule } from '@nestjs/testing';
import { ScopesService } from './scopes.service';

describe('ScopesService', () => {
  let service: ScopesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScopesService],
    }).compile();

    service = module.get<ScopesService>(ScopesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
