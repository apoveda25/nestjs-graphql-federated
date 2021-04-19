import { Test, TestingModule } from '@nestjs/testing';
import { Edge } from 'arangojs/documents';
import * as faker from 'faker';
import { CreateScopeDto } from '../../../scopes/domain/dto/create-scope.dto';
import { IRoleUpdateConflits } from '../../dist/app/roles/interfaces/role.interfaces';
import { AddScopesRoleDto } from '../dto/add-scopes-role.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { DeleteRoleDto } from '../dto/delete-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';
import {
  IRoleAddScopesConflicts,
  IRoleDeleteConflits,
  IRoleRemoveScopesConflicts,
} from '../interfaces/roles-has-scope.interfaces';
import { RoleModel } from './roles-has-scope.model';

describe('RoleModel', () => {
  let model: RoleModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleModel],
    }).compile();

    model = module.get<RoleModel>(RoleModel);
  });

  it('should be defined', () => {
    expect(model).toBeDefined();
  });

  describe('create', () => {
    it('should create a role', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const role: CreateRoleDto = {
        _id: `Roles/${_key}`,
        _key,
        name: faker.random.word(),
        description: faker.random.words(10),
        active: true,
        default: false,
        createdAt: Date.now(),
        updatedAt: 0,
        createdBy: `Users/${_key}`,
        updatedBy: '',
      };
      const roleConflicts = { withKey: null };
      const resultExpected = { ...role };

      /**
       * Act
       */
      const result = model.create(role, roleConflicts);

      /**
       * Assert
       */
      expect(result).toEqual(resultExpected);
    });
  });

  describe('update', () => {
    it('should update a role', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const updateRoleDto: UpdateRoleDto = {
        _id: `Roles/${_key}`,
        _key,
        name: faker.random.word(),
        description: faker.random.words(10),
        active: true,
        default: false,
        updatedAt: Date.now(),
        updatedBy: `Users/${_key}`,
      };
      const withKey: Role = {
        _id: `Roles/${_key}`,
        _key,
        name: faker.random.word(),
        description: faker.random.words(10),
        active: true,
        default: false,
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
        updatedAt: 0,
        updatedBy: '',
      };
      const roleConflicts: IRoleUpdateConflits = {
        withKey,
        withName: null,
        withDefault: null,
      };
      const resultExpected = { ...withKey, ...updateRoleDto };

      /**
       * Act
       */
      const result = model.update(updateRoleDto, roleConflicts);

      /**
       * Assert
       */
      expect(result).toEqual(resultExpected);
    });
  });

  describe('delete', () => {
    it('should delete a role', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const deleteRoleDto: DeleteRoleDto = { _id: `Roles/${_key}`, _key };
      const withKey: Role = {
        _id: `Roles/${_key}`,
        _key,
        name: faker.random.word(),
        description: faker.random.words(10),
        active: true,
        default: false,
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
        updatedAt: 0,
        updatedBy: '',
      };
      const roleConflicts: IRoleDeleteConflits = { withKey, withEdges: [] };
      const resultExpected = { ...withKey, ...deleteRoleDto };

      /**
       * Act
       */
      const result = model.delete(deleteRoleDto, roleConflicts);

      /**
       * Assert
       */
      expect(result).toEqual(resultExpected);
    });
  });

  describe('addScope', () => {
    it('should add a scope to role', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const createdBy = `Users/${_key}`;
      const role: CreateRoleDto = {
        _id: `Roles/${_key}`,
        _key,
        name: faker.random.word(),
        description: faker.random.words(10),
        active: true,
        default: false,
        createdAt: Date.now(),
        updatedAt: 0,
        createdBy,
        updatedBy: '',
      };
      const scope: CreateScopeDto = {
        _id: `Roles/${_key}`,
        _key,
        name: faker.random.word(),
        action: faker.random.word(),
        collection: faker.random.word(),
        createdAt: Date.now(),
        updatedAt: 0,
        createdBy,
        updatedBy: '',
      };
      const edge: AddScopesRoleDto = {
        _from: role._id,
        _to: scope._id,
        createdBy,
        createdAt: Date.now(),
      };
      const roleConflicts: IRoleAddScopesConflicts = {
        withFrom: role,
        withTo: scope,
      };
      const resultExpected = { ...edge };

      /**
       * Act
       */
      const result = model.addScope(edge, roleConflicts);

      /**
       * Assert
       */
      expect(result).toEqual(resultExpected);
    });
  });

  describe('removeScope', () => {
    it('should remove a scope to role', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const createdBy = `Users/${_key}`;
      const edge: Edge = {
        _from: `Roles/${_key}`,
        _to: `Scopes/${_key}`,
        createdAt: Date.now(),
        createdBy,
      };
      const roleConflicts: IRoleRemoveScopesConflicts = { withFromTo: edge };
      const resultExpected = { ...edge };

      /**
       * Act
       */
      const result = model.removeScope(edge, roleConflicts);

      /**
       * Assert
       */
      expect(result).toEqual(resultExpected);
    });
  });
});
