import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { CreateRoleDto } from '../dto/create-role.dto';
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
});
