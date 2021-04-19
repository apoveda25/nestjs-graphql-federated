import { Test, TestingModule } from '@nestjs/testing';
import { ScopesRepository } from '../../../infrastructure/repositories/scopes.repository';
import { ScopesSearchQuery } from '../impl/scopes-search.query';
import { ScopesSearchQueryHandler } from './scopes-search.handler';

describe('ScopesSearchQueryHandler', () => {
  let queryHandler: ScopesSearchQueryHandler;
  let scopesRepository: ScopesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScopesSearchQueryHandler,
        {
          provide: ScopesRepository,
          useFactory: () => ({ search: jest.fn() }),
        },
      ],
    }).compile();

    queryHandler = module.get<ScopesSearchQueryHandler>(
      ScopesSearchQueryHandler,
    );
    scopesRepository = module.get<ScopesRepository>(ScopesRepository);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(scopesRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should search and return an array of scopes', async () => {
      /**
       * Arrange
       */
      const filters = [];
      const sort = [];
      const pagination = { offset: 0, count: 10 };
      const query = new ScopesSearchQuery({ filters, sort, pagination });
      const resultExpected = [];

      const repositorySearchSpy = jest
        .spyOn(scopesRepository, 'search')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await queryHandler.execute(query);

      /**
       * Assert
       */
      expect(repositorySearchSpy).toHaveBeenCalledWith(query.input);
      expect(result).toEqual(resultExpected);
    });
  });
});
