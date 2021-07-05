import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { ScopesRepository } from '../../infrastructure/repositories/scopes.repository';
import { ScopesCreatedEventHandler } from './scopes-created.handler';

describe('ScopeCreatedEventHandler', () => {
  let eventHandler: ScopesCreatedEventHandler;
  let scopesRepository: ScopesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScopesCreatedEventHandler,
        {
          provide: ScopesRepository,
          useFactory: () => ({ create: jest.fn() }),
        },
      ],
    }).compile();

    eventHandler = module.get<ScopesCreatedEventHandler>(
      ScopesCreatedEventHandler,
    );
    scopesRepository = module.get<ScopesRepository>(ScopesRepository);
  });

  it('should be defined', () => {
    expect(eventHandler).toBeDefined();
    expect(scopesRepository).toBeDefined();
  });

  describe('handle', () => {
    it('create scopes', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const createScope = {
        _id: `Scopes/${_key}`,
        _key,
        name: faker.lorem.word(),
        action: faker.lorem.word(),
        collection: faker.lorem.word(),
        createdAt: Date.now(),
        updatedAt: null,
        createdBy: `Users/${faker.datatype.uuid()}`,
        updatedBy: null,
      };
      const event = { input: [createScope] };

      const scopesRepositoryHandleSpy = jest
        .spyOn(scopesRepository, 'create')
        .mockResolvedValue(createScope);

      /**
       * Act
       */
      const result = await eventHandler.handle(event);

      /**
       * Assert
       */
      expect(scopesRepositoryHandleSpy).toHaveBeenCalledWith([event.input]);
      expect(result).toStrictEqual([createScope]);
    });
  });
});
