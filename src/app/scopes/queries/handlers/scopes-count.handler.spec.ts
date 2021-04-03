import { Test, TestingModule } from '@nestjs/testing';
import { ScopesRepository } from '../../repositories/scopes.repository';
import { ScopesCountQuery } from '../impl/scopes-count.query';
import { ScopesCountQueryHandler } from './scopes-count.handler';

describe('ScopesCountQueryHandler', () => {
  let queryHandler: ScopesCountQueryHandler;
  let scopesRepository: ScopesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScopesCountQueryHandler,
        {
          provide: ScopesRepository,
          useFactory: () => ({ count: jest.fn() }),
        },
      ],
    }).compile();

    queryHandler = module.get<ScopesCountQueryHandler>(ScopesCountQueryHandler);
    scopesRepository = module.get<ScopesRepository>(ScopesRepository);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(scopesRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should count the scopes that match the applied filters', async () => {
      /**
       * Arrange
       */
      const filters = [];
      const query = new ScopesCountQuery({ filters });
      const resultExpected = 0;

      const repositoryCountSpy = jest
        .spyOn(scopesRepository, 'count')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await queryHandler.execute(query);

      /**
       * Assert
       */
      expect(repositoryCountSpy).toHaveBeenCalledWith(query.input);
      expect(result).toEqual(resultExpected);
    });
  });
});
