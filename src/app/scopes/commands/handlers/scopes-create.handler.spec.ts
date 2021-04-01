import { EventPublisher } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { Scope } from '../../entities/scope.entity';
import { ScopeCreateModelFaker } from '../../models/scope-create-fake.model';
import { ScopesRepository } from '../../repositories/scopes.repository';
import { ScopesRepositoryFake } from '../../repositories/scopes.repository-fake';
import { SCOPES_ACTIONS } from '../../scopes.constant';
import { ScopesCreateCommandHandler } from './scopes-create.handler';

describe('ScopesCreateCommandHandler', () => {
  let commandHandler: ScopesCreateCommandHandler;
  let scopesRepository: ScopesRepository;
  let publisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScopesCreateCommandHandler,
        {
          provide: ScopesRepository,
          useClass: ScopesRepositoryFake,
        },
        {
          provide: EventPublisher,
          useFactory: () => ({
            mergeClassContext: jest.fn(),
          }),
        },
      ],
    }).compile();

    commandHandler = module.get<ScopesCreateCommandHandler>(
      ScopesCreateCommandHandler,
    );
    scopesRepository = module.get<ScopesRepository>(ScopesRepository);
    publisher = module.get<EventPublisher>(EventPublisher);
  });

  it('should be defined', () => {
    expect(commandHandler).toBeDefined();
    expect(scopesRepository).toBeDefined();
    expect(publisher).toBeDefined();
  });

  describe('buildData', () => {
    it('building scopes', async () => {
      /**
       * Arrange
       */
      const collections = [{ name: 'Scopes' }];
      const createdBy = `Users/${faker.datatype.uuid()}`;

      /**
       * Act
       */
      const result = commandHandler.buildData(collections, createdBy);

      /**
       * Assert
       */
      expect(result.length).toEqual(6);
    });
  });

  describe('execute', () => {
    it('create and emit scopes', async () => {
      /**
       * Arrange
       */
      const nameCollection = faker.lorem.word();
      const collections = [{ name: nameCollection }];
      const createdBy = `Users/${faker.datatype.uuid()}`;
      const command = { createdBy };
      const createScopes: Scope[] = SCOPES_ACTIONS.map((action) => {
        const _key = faker.datatype.uuid();

        return Scope.of({
          _id: `${nameCollection}/${_key}`,
          _key,
          name: `${nameCollection.toLowerCase()}_${action.toLowerCase()}`,
          action,
          collection: nameCollection,
          createdAt: Date.now(),
          updatedAt: 0,
          createdBy,
          updatedBy: '',
        });
      });

      const aggregate = new ScopeCreateModelFaker('');

      const scopesRepositoryGetCollectionsSpy = jest
        .spyOn(scopesRepository, 'getCollections')
        .mockResolvedValue(collections);

      const commandHandlerBuildDataSpy = jest
        .spyOn(commandHandler, 'buildData')
        .mockReturnValue(createScopes);

      const scopesRepositoryFindOrSpy = jest
        .spyOn(scopesRepository, 'findOr')
        .mockResolvedValue(null);

      const publisherMergeClassContextSpy = jest
        .spyOn(publisher, 'mergeClassContext')
        .mockImplementation();

      const scopeCreateModelCreateSpy = jest
        .spyOn(aggregate, 'create')
        .mockReturnValue();

      const scopeCreateModelCommitSpy = jest
        .spyOn(aggregate, 'commit')
        .mockReturnValue();

      /**
       * Act
       */
      const result = await commandHandler.execute(command);

      /**
       * Assert
       */
      expect(scopesRepositoryGetCollectionsSpy).toHaveBeenCalled();
      expect(commandHandlerBuildDataSpy).toHaveBeenCalledWith(
        collections,
        command.createdBy,
      );
      expect(scopesRepositoryFindOrSpy).lastCalledWith({
        name: createScopes[5].name,
      });
      expect(publisherMergeClassContextSpy).toHaveBeenCalled();
      expect(scopeCreateModelCreateSpy).lastCalledWith(createScopes[5]);
      expect(scopeCreateModelCommitSpy).toHaveBeenCalled();
      expect(result.length).toEqual(6);
    });
  });
});
