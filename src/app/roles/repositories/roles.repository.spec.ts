import { Test, TestingModule } from '@nestjs/testing';
import { aql } from 'arangojs/aql';
import * as faker from 'faker';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { InputTransform } from '../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import { IEdgeSearchInput } from '../../../shared/interfaces/edge.interface';
import { CreateRoleDto } from '../dto/create-role.dto';
import { DeleteRoleDto } from '../dto/delete-role.dto';
import { Role } from '../entities/role.entity';
import { RolesRepository } from './roles.repository';

describe('RolesRepository', () => {
  let provider: RolesRepository;
  let arangoService: ArangodbService;
  let objectToAQL: ObjectToAQL;
  let inputTransform: InputTransform;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesRepository,
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

    provider = module.get<RolesRepository>(RolesRepository);
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
    it('should create a role', async () => {
      /**
       * Arrange
       */
      const name = 'Roles';
      const _key = faker.datatype.uuid();
      const createRoleDto: CreateRoleDto = {
        _id: `Roles/${_key}`,
        _key,
        name: faker.name.firstName(),
        description: faker.random.words(10),
        active: true,
        default: false,
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
        updatedAt: 0,
        updatedBy: '',
      };
      const cursor = [createRoleDto];
      const resultExpected = { ...createRoleDto };

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
      const result = await provider.create(createRoleDto);

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(result).toEqual(resultExpected);
    });
  });

  describe('update', () => {
    it('should update roles', async () => {
      /**
       * Arrange
       */
      const name = 'Roles';
      const _key = faker.datatype.uuid();
      const updateRoleDto = {
        _id: `Roles/${_key}`,
        _key,
        name: faker.name.firstName(),
        description: faker.random.words(10),
        active: true,
        default: false,
        updatedAt: Date.now(),
        updatedBy: `Users/${_key}`,
      };
      const resultExpected: Role = {
        ...updateRoleDto,
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
      };
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
      const result = await provider.update([updateRoleDto]);

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(result).toEqual([resultExpected]);
    });
  });

  describe('delete', () => {
    it('should delete roles', async () => {
      /**
       * Arrange
       */
      const name = 'Roles';
      const _key = faker.datatype.uuid();
      const deleteRoleDto: DeleteRoleDto = { _id: `Roles/${_key}`, _key };
      const resultExpected: Role = {
        ...deleteRoleDto,
        name: faker.name.firstName(),
        description: faker.random.words(10),
        active: true,
        default: false,
        updatedAt: Date.now(),
        updatedBy: `Users/${_key}`,
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
      };
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
      const result = await provider.delete([deleteRoleDto]);

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(result).toEqual([resultExpected]);
    });
  });

  describe('searchEdgeConnections', () => {
    it('should return an array of edges', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const input: IEdgeSearchInput = {
        direction: 'ANY',
        startVertexId: `Roles/${_key}`,
        collections: ['UsersHasRole', 'RolesHasScope'],
      };
      const collections = input.collections.map((collection) => ({
        name: collection,
      }));
      const cursor = [];
      const resultExpected = [];

      const arangoServiceCollectionSpy = jest
        .spyOn(arangoService, 'collection')
        .mockImplementation(jest.fn().mockReturnValue(collections));

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue(cursor));

      aql.join = jest.fn();

      /**
       * Act
       */
      const result = await provider.searchEdgeConnections(input);

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(
        input.collections[0],
      );
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(
        input.collections[1],
      );
      expect(result).toEqual(resultExpected);
    });
  });
});
