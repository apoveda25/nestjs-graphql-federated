import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { RolesHasScopeRepository } from '../../../infrastructure/repositories/roles-has-scope.repository';
import { RoleHasScopeOutQuery } from '../impl/role-has-scope-out.query';
import { RoleHasScopeOutQueryHandler } from './role-has-scope-out.handler';

describe('RoleHasScopeOutQueryHandler', () => {
  let queryHandler: RoleHasScopeOutQueryHandler;
  let rolesHasScopeRepository: RolesHasScopeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleHasScopeOutQueryHandler,
        {
          provide: RolesHasScopeRepository,
          useFactory: () => ({ searchOut: jest.fn() }),
        },
      ],
    }).compile();

    queryHandler = module.get<RoleHasScopeOutQueryHandler>(
      RoleHasScopeOutQueryHandler,
    );
    rolesHasScopeRepository = module.get<RolesHasScopeRepository>(
      RolesHasScopeRepository,
    );
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(rolesHasScopeRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should search scopes of role', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const filters = [];
      const sort = [];
      const pagination = { offset: 0, count: 1 };
      const parentId = `Roles/${_key}`;
      const query = new RoleHasScopeOutQuery({
        filters,
        sort,
        pagination,
        parentId,
      });
      const resultExpected = [];

      const repositoryHasScopeSpy = jest
        .spyOn(rolesHasScopeRepository, 'searchOut')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await queryHandler.execute(query);

      /**
       * Assert
       */
      expect(repositoryHasScopeSpy).toHaveBeenCalledWith(query.input);
      expect(result).toEqual(resultExpected);
    });
  });
});
