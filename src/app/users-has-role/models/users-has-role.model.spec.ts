import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { delta } from '../../../shared/helpers/delta';
import { Role } from '../../roles/entities/role.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUserCreateConflits } from '../interfaces/user.interfaces';
import { UserModel } from './users-has-role.model';

describe('UserModel', () => {
  let model: UserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserModel],
    }).compile();

    model = module.get<UserModel>(UserModel);
  });

  it('should be defined', () => {
    expect(model).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const createUserDto: CreateUserDto = {
        _id: `Users/${_key}`,
        _key,
        username: faker.name.firstName(),
        password: 'secret123456',
        name: faker.name.firstName(),
        surname: faker.name.firstName(),
        email: faker.internet.email(),
        emailActive: false,
        active: true,
        birthday: faker.date.past().getMilliseconds(),
        gender: faker.name.gender(),
        emailCode: '000000',
        emailCodeExpire: Date.now() + delta({ days: 1 }),
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
        updatedAt: 0,
        updatedBy: '',
        roleId: `Roles/${_key}`,
      };
      const role: Role = {
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
      const userConflicts: IUserCreateConflits = {
        withKey: null,
        withUsernameEmail: null,
        withRoleId: role,
      };
      const resultExpected = { ...createUserDto };

      /**
       * Act
       */
      const result = model.create(createUserDto, userConflicts);
      resultExpected.password = result.password;

      /**
       * Assert
       */
      expect(result).toEqual(resultExpected);
    });
  });

  // describe('update', () => {
  //   it('should update a user', async () => {
  //     /**
  //      * Arrange
  //      */
  //     const _key = faker.datatype.uuid();
  //     const updateUserDto: UpdateUserDto = {
  //       _id: `Users/${_key}`,
  //       _key,
  //       name: faker.random.word(),
  //       description: faker.random.words(10),
  //       active: true,
  //       default: false,
  //       updatedAt: Date.now(),
  //       updatedBy: `Users/${_key}`,
  //     };
  //     const withKey: User = {
  //       _id: `Users/${_key}`,
  //       _key,
  //       name: faker.random.word(),
  //       description: faker.random.words(10),
  //       active: true,
  //       default: false,
  //       createdAt: Date.now(),
  //       createdBy: `Users/${_key}`,
  //       updatedAt: 0,
  //       updatedBy: '',
  //     };
  //     const userConflicts: IUserUpdateConflits = {
  //       withKey,
  //       withName: null,
  //       withDefault: null,
  //     };
  //     const resultExpected = { ...withKey, ...updateUserDto };

  //     /**
  //      * Act
  //      */
  //     const result = model.update(updateUserDto, userConflicts);

  //     /**
  //      * Assert
  //      */
  //     expect(result).toEqual(resultExpected);
  //   });
  // });

  // describe('delete', () => {
  //   it('should delete a user', async () => {
  //     /**
  //      * Arrange
  //      */
  //     const _key = faker.datatype.uuid();
  //     const deleteUserDto: DeleteUserDto = { _id: `Users/${_key}`, _key };
  //     const withKey: User = {
  //       _id: `Users/${_key}`,
  //       _key,
  //       name: faker.random.word(),
  //       description: faker.random.words(10),
  //       active: true,
  //       default: false,
  //       createdAt: Date.now(),
  //       createdBy: `Users/${_key}`,
  //       updatedAt: 0,
  //       updatedBy: '',
  //     };
  //     const userConflicts: IUserDeleteConflits = { withKey, withEdges: [] };
  //     const resultExpected = { ...withKey, ...deleteUserDto };

  //     /**
  //      * Act
  //      */
  //     const result = model.delete(deleteUserDto, userConflicts);

  //     /**
  //      * Assert
  //      */
  //     expect(result).toEqual(resultExpected);
  //   });
  // });

  // describe('addScope', () => {
  //   it('should add a scope to user', async () => {
  //     /**
  //      * Arrange
  //      */
  //     const _key = faker.datatype.uuid();
  //     const createdBy = `Users/${_key}`;
  //     const user: CreateUserDto = {
  //       _id: `Users/${_key}`,
  //       _key,
  //       name: faker.random.word(),
  //       description: faker.random.words(10),
  //       active: true,
  //       default: false,
  //       createdAt: Date.now(),
  //       updatedAt: 0,
  //       createdBy,
  //       updatedBy: '',
  //     };
  //     const scope: CreateScopeDto = {
  //       _id: `Users/${_key}`,
  //       _key,
  //       name: faker.random.word(),
  //       action: faker.random.word(),
  //       collection: faker.random.word(),
  //       createdAt: Date.now(),
  //       updatedAt: 0,
  //       createdBy,
  //       updatedBy: '',
  //     };
  //     const edge: AddScopesUserDto = {
  //       _from: user._id,
  //       _to: scope._id,
  //       createdBy,
  //       createdAt: Date.now(),
  //     };
  //     const userConflicts: IUserAddScopesConflicts = {
  //       withFrom: user,
  //       withTo: scope,
  //     };
  //     const resultExpected = { ...edge };

  //     /**
  //      * Act
  //      */
  //     const result = model.addScope(edge, userConflicts);

  //     /**
  //      * Assert
  //      */
  //     expect(result).toEqual(resultExpected);
  //   });
  // });

  // describe('removeScope', () => {
  //   it('should remove a scope to user', async () => {
  //     /**
  //      * Arrange
  //      */
  //     const _key = faker.datatype.uuid();
  //     const createdBy = `Users/${_key}`;
  //     const edge: Edge = {
  //       _from: `Users/${_key}`,
  //       _to: `Scopes/${_key}`,
  //       createdAt: Date.now(),
  //       createdBy,
  //     };
  //     const userConflicts: IUserRemoveScopesConflicts = { withFromTo: edge };
  //     const resultExpected = { ...edge };

  //     /**
  //      * Act
  //      */
  //     const result = model.removeScope(edge, userConflicts);

  //     /**
  //      * Assert
  //      */
  //     expect(result).toEqual(resultExpected);
  //   });
  // });
});
