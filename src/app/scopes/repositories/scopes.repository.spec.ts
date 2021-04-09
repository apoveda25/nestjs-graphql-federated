import { Test, TestingModule } from '@nestjs/testing';
import { aql } from 'arangojs/aql';
import * as faker from 'faker';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { InputTransform } from '../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import { ScopesRepository } from './scopes.repository';

describe('ScopesRepository', () => {
  let provider: ScopesRepository;
  let arangoService: ArangodbService;
  let objectToAQL: ObjectToAQL;
  let inputTransform: InputTransform;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScopesRepository,
        {
          provide: ArangodbService,
          useFactory: () => ({
            collection: jest.fn(),
            collections: jest.fn(),
            query: jest.fn(),
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
            resourceToArray: jest.fn(),
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
    it('should fetch all collections', async () => {
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

  describe('findAnd', () => {
    it('should find a scope', async () => {
      /**
       * Arrange
       */
      const name = 'Scopes';
      const filters = { collection: faker.random.word() };
      const separator = '==';
      const operator = 'AND';
      const _filters = [
        { key: 'collection', value: filters.collection, operator, separator },
      ];
      const nameDocument = 'doc';
      const _key = faker.datatype.uuid();
      const resultExpected = {
        _id: `${name}/${_key}`,
        _key,
        name: faker.random.word(),
        action: faker.random.word(),
        collection: filters.collection,
        createdAt: faker.datatype.datetime().getMilliseconds(),
        updatedAt: faker.datatype.datetime().getMilliseconds(),
        createdBy: `Users/${faker.datatype.uuid()}`,
        updatedBy: '',
      };

      const inputTransformResourceToArraySpy = jest
        .spyOn(inputTransform, 'resourceToArray')
        .mockReturnValue(_filters);

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue([resultExpected]));

      const arangoServiceCollectionSpy = jest.spyOn(
        arangoService,
        'collection',
      );

      const objectToAQLFiltersToAQLSpy = jest.spyOn(
        objectToAQL,
        'filtersToAql',
      );

      aql.join = jest.fn();

      /**
       * Act
       */
      const result = await provider.findAnd(filters);

      /**
       * Assert
       */
      expect(inputTransformResourceToArraySpy).toHaveBeenCalledWith(
        filters,
        separator,
        operator,
      );
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(objectToAQLFiltersToAQLSpy).toHaveBeenCalledWith(
        _filters,
        nameDocument,
      );
      expect(result).toEqual(resultExpected);
    });

    it('should return null', async () => {
      /**
       * Arrange
       */
      const name = 'Scopes';
      const filters = { collection: faker.random.word() };
      const separator = '==';
      const operator = 'AND';
      const _filters = [
        { key: 'collection', value: filters.collection, operator, separator },
      ];
      const nameDocument = 'doc';
      const resultExpected = null;

      const inputTransformResourceToArraySpy = jest
        .spyOn(inputTransform, 'resourceToArray')
        .mockReturnValue(_filters);

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue([]));

      const arangoServiceCollectionSpy = jest.spyOn(
        arangoService,
        'collection',
      );

      const objectToAQLFiltersToAQLSpy = jest.spyOn(
        objectToAQL,
        'filtersToAql',
      );

      aql.join = jest.fn();

      /**
       * Act
       */
      const result = await provider.findAnd(filters);

      /**
       * Assert
       */
      expect(inputTransformResourceToArraySpy).toHaveBeenCalledWith(
        filters,
        separator,
        operator,
      );
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(objectToAQLFiltersToAQLSpy).toHaveBeenCalledWith(
        _filters,
        nameDocument,
      );
      expect(result).toEqual(resultExpected);
    });
  });

  describe('findOr', () => {
    it('should find a scope', async () => {
      /**
       * Arrange
       */
      const name = 'Scopes';
      const filters = { collection: faker.random.word() };
      const separator = '==';
      const operator = 'OR';
      const _filters = [
        { key: 'collection', value: filters.collection, operator, separator },
      ];
      const nameDocument = 'doc';
      const _key = faker.datatype.uuid();
      const resultExpected = {
        _id: `${name}/${_key}`,
        _key,
        name: faker.random.word(),
        action: faker.random.word(),
        collection: filters.collection,
        createdAt: faker.datatype.datetime().getMilliseconds(),
        updatedAt: faker.datatype.datetime().getMilliseconds(),
        createdBy: `Users/${faker.datatype.uuid()}`,
        updatedBy: '',
      };

      const inputTransformResourceToArraySpy = jest
        .spyOn(inputTransform, 'resourceToArray')
        .mockReturnValue(_filters);

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue([resultExpected]));

      const arangoServiceCollectionSpy = jest.spyOn(
        arangoService,
        'collection',
      );

      const objectToAQLFiltersToAQLSpy = jest.spyOn(
        objectToAQL,
        'filtersToAql',
      );
      aql.join = jest.fn();

      /**
       * Act
       */
      const result = await provider.findOr(filters);

      /**
       * Assert
       */
      expect(inputTransformResourceToArraySpy).toHaveBeenCalledWith(
        filters,
        separator,
        operator,
      );
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(objectToAQLFiltersToAQLSpy).toHaveBeenCalledWith(
        _filters,
        nameDocument,
      );
      expect(result).toEqual(resultExpected);
    });

    it('should return null', async () => {
      /**
       * Arrange
       */
      const name = 'Scopes';
      const filters = { collection: faker.random.word() };
      const separator = '==';
      const operator = 'OR';
      const _filters = [
        { key: 'collection', value: filters.collection, operator, separator },
      ];
      const nameDocument = 'doc';
      const resultExpected = null;

      const inputTransformResourceToArraySpy = jest
        .spyOn(inputTransform, 'resourceToArray')
        .mockReturnValue(_filters);

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue([]));

      const arangoServiceCollectionSpy = jest.spyOn(
        arangoService,
        'collection',
      );

      const objectToAQLFiltersToAQLSpy = jest.spyOn(
        objectToAQL,
        'filtersToAql',
      );

      aql.join = jest.fn();

      /**
       * Act
       */
      const result = await provider.findOr(filters);

      /**
       * Assert
       */
      expect(inputTransformResourceToArraySpy).toHaveBeenCalledWith(
        filters,
        separator,
        operator,
      );
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(objectToAQLFiltersToAQLSpy).toHaveBeenCalledWith(
        _filters,
        nameDocument,
      );
      expect(result).toEqual(resultExpected);
    });
  });

  describe('count', () => {
    it('should count scopes', async () => {
      /**
       * Arrange
       */
      const name = 'Scopes';
      const filters = [];
      const nameDocument = 'doc';
      const resultExpected = 0;

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue([resultExpected]));

      const arangoServiceCollectionSpy = jest.spyOn(
        arangoService,
        'collection',
      );

      const objectToAQLFiltersToAQLSpy = jest.spyOn(
        objectToAQL,
        'filtersToAql',
      );

      aql.join = jest.fn();

      /**
       * Act
       */
      const result = await provider.count({ filters });

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(objectToAQLFiltersToAQLSpy).toHaveBeenCalledWith(
        filters,
        nameDocument,
      );
      expect(result).toEqual(resultExpected);
    });
  });

  describe('search', () => {
    it('should search scopes', async () => {
      /**
       * Arrange
       */
      const name = 'Scopes';
      const filters = [];
      const sort = [];
      const pagination = { offset: 0, count: 30 };
      const nameDocument = 'doc';
      const resultExpected = [];

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue(resultExpected));

      const arangoServiceCollectionSpy = jest.spyOn(
        arangoService,
        'collection',
      );

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
      const result = await provider.search({ filters, sort, pagination });

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(objectToAQLFiltersToAQLSpy).toHaveBeenCalledWith(
        filters,
        nameDocument,
      );
      expect(objectToAQLSortToAQLSpy).toHaveBeenCalledWith(sort, nameDocument);
      expect(objectToAQLPaginationToAQLSpy).toHaveBeenCalledWith(pagination);
      expect(result).toEqual(resultExpected);
    });
  });

  describe('create', () => {
    it('should create scopes', async () => {
      /**
       * Arrange
       */
      const name = 'Scopes';
      const createScopeDto = [];

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue([]));
      const arangoServiceCollectionSpy = jest.spyOn(
        arangoService,
        'collection',
      );

      /**
       * Act
       */
      const result = await provider.create(createScopeDto);

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(result).toEqual([]);
    });
  });
});
