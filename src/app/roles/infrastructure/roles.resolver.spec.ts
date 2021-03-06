import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { IFilterToAQL } from '../../../dist/arangodb/providers/object-to-aql.interface';
import { InputTransform } from '../../arangodb/providers/input-transform';
import { CountResourcesPipe } from '../../shared/pipes/count-resources.pipe';
import { FindResourcePipe } from '../../shared/pipes/find-resource.pipe';
import { SearchResourcesPipe } from '../../shared/pipes/search-resources.pipe';
import { RoleAddScopesCommand } from './application/commands/impl/role-add-scopes.command';
import { RoleCreateCommand } from './application/commands/impl/role-create.command';
import { RoleRemoveScopesCommand } from './application/commands/impl/role-remove-scopes.command';
import { RolesDeleteCommand } from './application/commands/impl/roles-delete.command';
import { RolesUpdateCommand } from './application/commands/impl/roles-update.command';
import { RoleFindQuery } from './application/queries/impl/role-find.query';
import { RoleHasScopeSearchOutQuery } from './application/queries/impl/role-has-scope-search-out.query';
import { RolesCountQuery } from './application/queries/impl/roles-count.query';
import { RolesSearchQuery } from './application/queries/impl/roles-search.query';
import { AddScopesRoleDto } from './dto/add-scopes-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { FindRoleInput } from './dto/find-role.input';
import { RemoveScopesRoleDto } from './dto/remove-scopes-role.dto';
import { Role } from './entities/role.entity';
import { AddScopesRolePipe } from './pipes/add-scopes-role.pipe';
import { CreateRolePipe } from './pipes/create-role.pipe';
import { DeleteRolesPipe } from './pipes/delete-roles.pipe';
import { UpdateRolesPipe } from './pipes/update-roles.pipe';
import { RolesResolver } from './roles.resolver';

describe('RolesResolver', () => {
  let resolver: RolesResolver;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesResolver,
        {
          provide: CommandBus,
          useFactory: () => ({ execute: jest.fn() }),
        },
        {
          provide: QueryBus,
          useFactory: () => ({ execute: jest.fn() }),
        },
        {
          provide: InputTransform,
          useFactory: () => ({
            filtersToArray: jest.fn(),
            sortToArray: jest.fn(),
          }),
        },
      ],
    })
      .overridePipe(CreateRolePipe)
      .useValue({})
      .overridePipe(UpdateRolesPipe)
      .useValue({})
      .overridePipe(DeleteRolesPipe)
      .useValue({})
      .overridePipe(FindResourcePipe)
      .useValue({})
      .overridePipe(SearchResourcesPipe)
      .useValue({})
      .overridePipe(CountResourcesPipe)
      .useValue({})
      .overridePipe(AddScopesRolePipe)
      .useValue({})
      .compile();

    resolver = module.get<RolesResolver>(RolesResolver);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(commandBus).toBeDefined();
    expect(queryBus).toBeDefined();
  });

  describe('create', () => {
    it('should create a role', async () => {
      /**
       * Arrange
       */
      const _key = '20f736ce-b6a0-4ed5-8062-47d32c844d3d';
      const createRoleDto: CreateRoleDto = {
        _id: `Roles/${_key}`,
        _key,
        name: 'client',
        description: '',
        active: true,
        default: false,
        createdAt: Date.now(),
        updatedAt: 0,
        createdBy: `Users/${_key}`,
        updatedBy: '',
      };
      const roleCreateCommand = new RoleCreateCommand(createRoleDto);
      const resultExpected = { ...createRoleDto };

      const commandBusExecuteSpy = jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await resolver.create(createRoleDto);

      /**
       * Assert
       */
      expect(commandBusExecuteSpy).toHaveBeenCalledWith(roleCreateCommand);
      expect(result).toEqual(resultExpected);
    });
  });

  describe('update', () => {
    it('should update roles', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const updateRoleDto = {
        _id: `Roles/${_key}`,
        _key,
        name: 'client',
        description: '',
        active: true,
        default: false,
        updatedAt: Date.now(),
        updatedBy: `Users/${_key}`,
      };
      const rolesUpdateCommand = new RolesUpdateCommand([updateRoleDto]);
      const resultExpected: Role = {
        ...updateRoleDto,
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
      };

      const commandBusExecuteSpy = jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await resolver.update([updateRoleDto]);

      /**
       * Assert
       */
      expect(commandBusExecuteSpy).toHaveBeenCalledWith(rolesUpdateCommand);
      expect(result).toEqual(resultExpected);
    });
  });

  describe('delete', () => {
    it('should delete roles', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const deleteRoleDto = { _id: `Roles/${_key}`, _key };
      const rolesDeleteCommand = new RolesDeleteCommand([deleteRoleDto]);
      const resultExpected: Role[] = [
        {
          ...deleteRoleDto,
          name: 'client',
          description: '',
          active: true,
          default: false,
          updatedAt: Date.now(),
          updatedBy: `Users/${_key}`,
          createdAt: Date.now(),
          createdBy: `Users/${_key}`,
        },
      ];

      const commandBusExecuteSpy = jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await resolver.delete([deleteRoleDto]);

      /**
       * Assert
       */
      expect(commandBusExecuteSpy).toHaveBeenCalledWith(rolesDeleteCommand);
      expect(result).toEqual(resultExpected);
    });
  });

  describe('find', () => {
    it('should find a role', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const filters: FindRoleInput = { _key };
      const roleFindQuery = new RoleFindQuery(filters);
      const resultExpected: Role = {
        _id: `Roles/${_key}`,
        _key,
        name: 'client',
        description: '',
        active: true,
        default: false,
        updatedAt: Date.now(),
        updatedBy: `Users/${_key}`,
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
      };

      const queryBusExecuteSpy = jest
        .spyOn(queryBus, 'execute')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await resolver.find(filters);

      /**
       * Assert
       */
      expect(queryBusExecuteSpy).toHaveBeenCalledWith(roleFindQuery);
      expect(result).toEqual(resultExpected);
    });
  });

  describe('search', () => {
    it('should search roles', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const filters = [];
      const sort = [];
      const pagination = { offset: 0, count: 1 };
      const rolesSearchQuery = new RolesSearchQuery({
        filters,
        sort,
        pagination,
      });
      const resultExpected: Role[] = [
        {
          _id: `Roles/${_key}`,
          _key,
          name: 'client',
          description: '',
          active: true,
          default: false,
          updatedAt: Date.now(),
          updatedBy: `Users/${_key}`,
          createdAt: Date.now(),
          createdBy: `Users/${_key}`,
        },
      ];

      const queryBusExecuteSpy = jest
        .spyOn(queryBus, 'execute')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await resolver.search(filters, sort, pagination);

      /**
       * Assert
       */
      expect(queryBusExecuteSpy).toHaveBeenCalledWith(rolesSearchQuery);
      expect(result).toEqual(resultExpected);
    });
  });

  describe('count', () => {
    it('should count roles', async () => {
      /**
       * Arrange
       */
      const filters = [];
      const rolesCountQuery = new RolesCountQuery(filters);
      const resultExpected = faker.datatype.number(500);

      const queryBusExecuteSpy = jest
        .spyOn(queryBus, 'execute')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await resolver.count(filters);

      /**
       * Assert
       */
      expect(queryBusExecuteSpy).toHaveBeenCalledWith(rolesCountQuery);
      expect(result).toEqual(resultExpected);
    });
  });

  describe('scopes', () => {
    it('should search scopes of role', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const filters: IFilterToAQL[] = [];
      const sort = [];
      const pagination = { offset: 0, count: 1 };
      const parent = {
        _id: `Roles/${_key}`,
        _key,
        name: 'client',
        description: '',
        active: true,
        default: false,
        updatedAt: Date.now(),
        updatedBy: `Users/${_key}`,
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
      };
      const input = { filters, sort, pagination, parentId: parent._id };
      const roleHasScopeQuery = new RoleHasScopeSearchOutQuery(input);
      const resultExpected = [];

      const queryBusExecuteSpy = jest
        .spyOn(queryBus, 'execute')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await resolver.scopes(parent, filters, sort, pagination);

      /**
       * Assert
       */
      expect(queryBusExecuteSpy).toHaveBeenCalledWith(roleHasScopeQuery);
      expect(result).toEqual(resultExpected);
    });
  });

  describe('addScopes', () => {
    it('should add scopes to role', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const addScopesRoleDto: AddScopesRoleDto[] = [
        {
          _from: `Roles/${_key}`,
          _to: `Scopes/${_key}`,
          createdAt: Date.now(),
          createdBy: `Users/${_key}`,
        },
      ];
      const roleAddScopesCommand = new RoleAddScopesCommand(addScopesRoleDto);
      const resultExpected = true;

      const commandBusExecuteSpy = jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await resolver.addScopes(addScopesRoleDto);

      /**
       * Assert
       */
      expect(commandBusExecuteSpy).toHaveBeenCalledWith(roleAddScopesCommand);
      expect(result).toEqual(resultExpected);
    });
  });

  describe('removeScopes', () => {
    it('should remove scopes to role', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const removeScopesRoleDto: RemoveScopesRoleDto[] = [
        {
          _from: `Roles/${_key}`,
          _to: `Scopes/${_key}`,
        },
      ];
      const roleRemoveScopesCommand = new RoleRemoveScopesCommand(
        removeScopesRoleDto,
      );
      const resultExpected = true;

      const commandBusExecuteSpy = jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await resolver.removeScopes(removeScopesRoleDto);

      /**
       * Assert
       */
      expect(commandBusExecuteSpy).toHaveBeenCalledWith(
        roleRemoveScopesCommand,
      );
      expect(result).toEqual(resultExpected);
    });
  });
});
