import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { IRoleUpdateConflits } from '../../../../dist/app/roles/interfaces/role.interfaces';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';
import { RoleModel } from './role.model';

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
      const roleConflict = null;
      const resultExpected = { ...role };

      /**
       * Act
       */
      const result = model.create(role, roleConflict);

      /**
       * Assert
       */
      expect(result).toEqual(resultExpected);
    });
  });

  describe('update', () => {
    it('should updates roles', async () => {
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
});
