import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { SCOPES_ACTIONS } from '../../../domain/constants/scopes.constant';
import { Scope } from '../../../domain/entities/scope.entity';
import { ScopesCreatedEvent } from '../../../domain/events/scopes-created.event';
import { ScopeModel } from '../../../domain/models/scope.model';
import { ScopesRepository } from '../../../infrastructure/repositories/scopes.repository';
import { ScopesCreateCommandHandler } from './scopes-create.handler';

describe('ScopesCreateCommandHandler', () => {
  let commandHandler: ScopesCreateCommandHandler;
  let scopesRepository: ScopesRepository;
  let scopeModel: ScopeModel;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScopesCreateCommandHandler,
        {
          provide: ScopesRepository,
          useFactory: () => ({ getCollections: jest.fn(), findOr: jest.fn() }),
        },
        {
          provide: ScopeModel,
          useFactory: () => ({ create: jest.fn() }),
        },
        {
          provide: EventBus,
          useFactory: () => ({
            publish: jest.fn(),
          }),
        },
      ],
    }).compile();

    commandHandler = module.get<ScopesCreateCommandHandler>(
      ScopesCreateCommandHandler,
    );
    scopesRepository = module.get<ScopesRepository>(ScopesRepository);
    scopeModel = module.get<ScopeModel>(ScopeModel);
    eventBus = module.get<EventBus>(EventBus);
  });

  it('should be defined', () => {
    expect(commandHandler).toBeDefined();
    expect(scopesRepository).toBeDefined();
    expect(scopeModel).toBeDefined();
    expect(eventBus).toBeDefined();
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
      const scopeConflict = null;
      const createScopes: Scope[] = SCOPES_ACTIONS.map((action) => {
        const _key = faker.datatype.uuid();

        return {
          _id: `${nameCollection}/${_key}`,
          _key,
          name: `${nameCollection.toLowerCase()}_${action.toLowerCase()}`,
          action,
          collection: nameCollection,
          createdAt: Date.now(),
          updatedAt: null,
          createdBy,
          updatedBy: null,
        };
      });
      const scopesCreatedEvent = createScopes.map(
        (scope) => new ScopesCreatedEvent([scope]),
      );

      const scopesRepositoryGetCollectionsSpy = jest
        .spyOn(scopesRepository, 'getCollections')
        .mockResolvedValue(collections);

      const commandHandlerBuildDataSpy = jest
        .spyOn(commandHandler, 'buildData')
        .mockReturnValue(createScopes);

      const scopesRepositoryFindOrSpy = jest
        .spyOn(scopesRepository, 'findOr')
        .mockResolvedValue(scopeConflict);

      const scopeModelCreateSpy = jest
        .spyOn(scopeModel, 'create')
        .mockReturnValue(createScopes[0]);

      const eventBusPublishSpy = jest.spyOn(eventBus, 'publish');

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
      expect(scopesRepositoryFindOrSpy).toHaveBeenCalledWith({
        _key: createScopes[0]._key,
        name: createScopes[0].name,
      });
      expect(scopeModelCreateSpy).toHaveBeenCalledWith(
        createScopes[0],
        scopeConflict,
      );
      expect(eventBusPublishSpy).toHaveBeenCalledWith(scopesCreatedEvent[0]);
      expect(result.length).toEqual(6);
    });
  });
});
