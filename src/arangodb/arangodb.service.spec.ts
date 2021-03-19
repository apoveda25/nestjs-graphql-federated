import { Test, TestingModule } from '@nestjs/testing';
import { ArangodbService } from './arangodb.service';

describe('ArangodbService', () => {
  let service: ArangodbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArangodbService],
    }).compile();

    service = module.get<ArangodbService>(ArangodbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
