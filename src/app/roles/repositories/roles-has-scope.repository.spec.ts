import { Test, TestingModule } from '@nestjs/testing';
import { aql } from 'arangojs/aql';
import * as faker from 'faker';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { InputTransform } from '../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import { IEdgeFilter } from '../../../shared/interfaces/edge.interface';
import { AddScopesRoleDto } from '../dto/add-scopes-role.dto';
import { RemoveScopesRoleDto } from '../dto/remove-scopes-role.dto';
import { RolesHasScopeRepository } from './roles-has-scope.repository';

describe('RolesHasScopeRepository', () => {
  let provider: RolesHasScopeRepository;
  let arangoService: ArangodbService;
  let objectToAQL: ObjectToAQL;
  let inputTransform: InputTransform;

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
        {
          provide: InputTransform,
          useFactory: () => ({
            resourceToArray: jest.fn(),
          }),
        },
      ],
    }).compile();

    provider = module.get<RolesHasScopeRepository>(RolesHasScopeRepository);
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

  describe('create', () => {
    it('should create edge has_role', async () => {
      /**
       * Arrange
       */
      const name = 'RolesHasScope';
      const _key = faker.datatype.uuid();
      const addScopesRoleDto: AddScopesRoleDto[] = [
        {
          _from: `Roles/${_key}`,
          _to: `Scopes/${_key}`,
          createdAt: Date.now(),
          createdBy: `Users/${_key}`,
        },
      ];
      const resultExpected = [addScopesRoleDto];

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue([addScopesRoleDto]));

      const arangoServiceCollectionSpy = jest.spyOn(
        arangoService,
        'collection',
      );

      /**
       * Act
       */
      const result = await provider.create(addScopesRoleDto);

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(result).toEqual(resultExpected);
    });
  });

  describe('create', () => {
    it('should delete edge has_role', async () => {
      /**
       * Arrange
       */
      const name = 'RolesHasScope';
      const _key = faker.datatype.uuid();
      const removeScopesRoleDto: RemoveScopesRoleDto[] = [
        {
          _from: `Roles/${_key}`,
          _to: `Scopes/${_key}`,
        },
      ];
      const resultExpected = [removeScopesRoleDto];

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue(resultExpected));

      const arangoServiceCollectionSpy = jest.spyOn(
        arangoService,
        'collection',
      );

      /**
       * Act
       */
      const result = await provider.delete(removeScopesRoleDto);

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(result).toEqual(resultExpected);
    });
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
      const result = await provider.searchOut({
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

  describe('findAnd', () => {
    it('should find a edge', async () => {
      /**
       * Arrange
       */
      const name = 'RolesHasScope';
      const _key = faker.datatype.uuid();
      const filters: IEdgeFilter = {
        _from: `Roles/${_key}`,
        _to: `Scopes/${_key}`,
      };
      const resultExpected = null;
      const cursor = [resultExpected];

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue(cursor));

      const arangoServiceCollectionSpy = jest.spyOn(
        arangoService,
        'collection',
      );

      /**
       * Act
       */
      const result = await provider.findAnd(filters);

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(result).toEqual(resultExpected);
    });
  });
});
