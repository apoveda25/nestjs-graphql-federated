import { Test, TestingModule } from '@nestjs/testing';
import { aql } from 'arangojs/aql';
import * as faker from 'faker';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import { RolesHasScopeRepository } from './roles-has-scope.repository';

describe('RolesHasScopeRepository', () => {
  let provider: RolesHasScopeRepository;
  let arangoService: ArangodbService;
  let objectToAQL: ObjectToAQL;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesHasScopeRepository,
        {
          provide: ArangodbService,
          useFactory: () => ({
            collection: jest.fn(),
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
      ],
    }).compile();

    provider = module.get<RolesHasScopeRepository>(RolesHasScopeRepository);
    arangoService = module.get<ArangodbService>(ArangodbService);
    objectToAQL = module.get<ObjectToAQL>(ObjectToAQL);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
    expect(arangoService).toBeDefined();
    expect(objectToAQL).toBeDefined();
  });

  describe('hasScope', () => {
    it('should search scopes of role', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const filters = [];
      const sort = [];
      const pagination = { offset: 0, count: 1 };
      const parentId = `Roles/${_key}`;
      const resultExpected = [];

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue(resultExpected));

      const arangoServiceCollectionSpy = jest.spyOn(
        arangoService,
        'collection',
      );

      aql.join = jest.fn();

      /**
       * Act
       */
      const result = await provider.searchIn({
        filters,
        sort,
        pagination,
        parentId,
      });

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledTimes(3);
      expect(result).toEqual(resultExpected);
    });
  });
});
