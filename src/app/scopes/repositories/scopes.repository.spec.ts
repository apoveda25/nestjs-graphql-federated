import { Test, TestingModule } from '@nestjs/testing';
import { aql } from 'arangojs/aql';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { InputTransform } from '../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import { ScopesRepository } from './scopes.repository';

describe('ScopesRepository', () => {
  let provider: ScopesRepository;
  let arangoService: ArangodbService;
  let objectToAQL: ObjectToAQL;
  let inputTransform: InputTransform;
  let saveAll: any;

  beforeEach(async () => {
    saveAll = jest.fn().mockReturnValue([]);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScopesRepository,
        {
          provide: ArangodbService,
          useFactory: () => ({
            collection: jest.fn(() => ({ saveAll })),
            collections: jest.fn(),
            query: jest.fn().mockReturnValue([]),
          }),
        },
        {
          provide: ObjectToAQL,
          useFactory: () => ({
            filtersToAql: jest.fn(),
            sortToAql: jest.fn(),
            paginationToAql: jest.fn(),
          }),
        },
        {
          provide: InputTransform,
          useFactory: () => ({
            resourceToArray: jest.fn().mockReturnValue([]),
          }),
        },
      ],
    }).compile();

    provider = module.get<ScopesRepository>(ScopesRepository);
    arangoService = module.get<ArangodbService>(ArangodbService);
    objectToAQL = module.get<ObjectToAQL>(ObjectToAQL);
    inputTransform = module.get<InputTransform>(InputTransform);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
    expect(arangoService).toBeDefined();
    expect(objectToAQL).toBeDefined();
    expect(inputTransform).toBeDefined();
  });

  describe('getCollections', () => {
    it('fetch all collections', async () => {
      /**
       * Arrange
       */
      const excludeSystem = true;

      const arangoServiceCollectionsSpy = jest.spyOn(
        arangoService,
        'collections',
      );

      /**
       * Act
       */
      await provider.getCollections();

      /**
       * Assert
       */
      expect(arangoServiceCollectionsSpy).toHaveBeenCalledWith(excludeSystem);
    });
  });

  describe('search', () => {
    it('search scopes', async () => {
      /**
       * Arrange
       */
      const filters = [];
      const sort = [];
      const pagination = { offset: 0, count: 30 };
      const nameDocument = 'doc';

      const arangoServiceQuerySpy = jest.spyOn(arangoService, 'query');
      const objectToAQLFiltersToAQLSpy = jest.spyOn(
        objectToAQL,
        'filtersToAql',
      );
      const objectToAQLSortToAQLSpy = jest.spyOn(objectToAQL, 'sortToAql');
      const objectToAQLPaginationToAQLSpy = jest.spyOn(
        objectToAQL,
        'paginationToAql',
      );
      aql.join = jest.fn();

      /**
       * Act
       */
      await provider.search({ filters, sort, pagination });

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(objectToAQLFiltersToAQLSpy).toHaveBeenCalledWith(
        filters,
        nameDocument,
      );
      expect(objectToAQLSortToAQLSpy).toHaveBeenCalledWith(sort, nameDocument);
      expect(objectToAQLPaginationToAQLSpy).toHaveBeenCalledWith(pagination);
    });
  });

  describe('findAnd', () => {
    it('find scope by key', async () => {
      /**
       * Arrange
       */
      const filters = {};
      const _filters = [];
      const separator = '==';
      const operator = 'AND';
      const nameDocument = 'doc';

      const inputTransformResourceToArraySpy = jest.spyOn(
        inputTransform,
        'resourceToArray',
      );
      const arangoServiceQuerySpy = jest.spyOn(arangoService, 'query');
      const objectToAQLFiltersToAQLSpy = jest.spyOn(
        objectToAQL,
        'filtersToAql',
      );
      aql.join = jest.fn();

      /**
       * Act
       */
      await provider.findAnd(filters);

      /**
       * Assert
       */
      expect(inputTransformResourceToArraySpy).toHaveBeenCalledWith(
        filters,
        separator,
        operator,
      );
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(objectToAQLFiltersToAQLSpy).toHaveBeenCalledWith(
        _filters,
        nameDocument,
      );
    });
  });

  describe('findOr', () => {
    it('find scope by key', async () => {
      /**
       * Arrange
       */
      const filters = {};
      const _filters = [];
      const separator = '==';
      const operator = 'OR';
      const nameDocument = 'doc';

      const inputTransformResourceToArraySpy = jest.spyOn(
        inputTransform,
        'resourceToArray',
      );
      const arangoServiceQuerySpy = jest.spyOn(arangoService, 'query');
      const objectToAQLFiltersToAQLSpy = jest.spyOn(
        objectToAQL,
        'filtersToAql',
      );
      aql.join = jest.fn();

      /**
       * Act
       */
      await provider.findOr(filters);

      /**
       * Assert
       */
      expect(inputTransformResourceToArraySpy).toHaveBeenCalledWith(
        filters,
        separator,
        operator,
      );
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(objectToAQLFiltersToAQLSpy).toHaveBeenCalledWith(
        _filters,
        nameDocument,
      );
    });
  });

  describe('create', () => {
    it('create scopes', async () => {
      /**
       * Arrange
       */
      const nameCollection = 'Scopes';
      const createScopeDto = [];
      const options = { returnNew: true };

      /**
       * Act
       */
      const result = await provider.create(createScopeDto);

      /**
       * Assert
       */
      expect(arangoService.collection).toHaveBeenCalledWith(nameCollection);
      expect(saveAll).toHaveBeenCalledWith(createScopeDto, options);
      expect(result).toEqual([]);
    });
  });
});
