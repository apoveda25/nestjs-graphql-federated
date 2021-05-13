import { Test, TestingModule } from '@nestjs/testing';
import { QueryParseService } from './query-parse.service';

describe('QueryParseService', () => {
  let service: QueryParseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryParseService],
    }).compile();

    service = module.get<QueryParseService>(QueryParseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
