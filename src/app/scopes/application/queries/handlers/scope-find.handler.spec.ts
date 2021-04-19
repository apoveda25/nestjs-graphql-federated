import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { ScopesRepository } from '../../../infrastructure/repositories/scopes.repository';
import { ScopeFindQuery } from '../impl/scope-find.query';
import { ScopeFindQueryHandler } from './scope-find.handler';

describe('ScopeFindQueryHandler', () => {
  let queryHandler: ScopeFindQueryHandler;
  let scopesRepository: ScopesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScopeFindQueryHandler,
        {
          provide: ScopesRepository,
          useFactory: () => ({ findOr: jest.fn() }),
        },
      ],
    }).compile();

    queryHandler = module.get<ScopeFindQueryHandler>(ScopeFindQueryHandler);
    scopesRepository = module.get<ScopesRepository>(ScopesRepository);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(scopesRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should find a scope', async () => {
      /**
       * Arrange
       */
      const input = { name: 'scopes_create' };
      const query = new ScopeFindQuery(input);
      const createdBy = `Users/${faker.datatype.uuid()}`;
      const _key = faker.datatype.uuid();
      const _id = `Scopes/${_key}`;
      const resource = {
        _id,
        _key,
        name: faker.lorem.word(),
        action: faker.lorem.word(),
        collection: faker.lorem.word(),
        createdAt: Date.now(),
        updatedAt: 0,
        createdBy,
        updatedBy: '',
      };

      const repositoryFindOrSpy = jest
        .spyOn(scopesRepository, 'findOr')
        .mockResolvedValue(resource);

      /**
       * Act
       */
      const result = await queryHandler.execute(query);

      /**
       * Assert
       */
      expect(repositoryFindOrSpy).toHaveBeenCalledWith(query.input);
      expect(result).toEqual(resource);
    });
  });
});
