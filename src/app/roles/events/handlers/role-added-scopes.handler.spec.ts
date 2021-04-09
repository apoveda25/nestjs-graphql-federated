import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { AddScopesRoleDto } from '../../dto/add-scopes-role.dto';
import { RolesHasScopeRepository } from '../../repositories/roles-has-scope.repository';
import { RoleAddedScopesEvent } from '../impl/role-added-scopes.event';
import { RoleAddedScopesEventHandler } from './role-added-scopes.handler';

describe('RoleAddedScopesEventHandler', () => {
  let eventHandler: RoleAddedScopesEventHandler;
  let rolesHasScopeRepository: RolesHasScopeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleAddedScopesEventHandler,
        {
          provide: RolesHasScopeRepository,
          useFactory: () => ({ create: jest.fn() }),
        },
      ],
    }).compile();

    eventHandler = module.get<RoleAddedScopesEventHandler>(
      RoleAddedScopesEventHandler,
    );
    rolesHasScopeRepository = module.get<RolesHasScopeRepository>(
      RolesHasScopeRepository,
    );
  });

  it('should be defined', () => {
    expect(eventHandler).toBeDefined();
    expect(rolesHasScopeRepository).toBeDefined();
  });

  describe('handle', () => {
    it('should create a role', async () => {
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
      const event = new RoleAddedScopesEvent(addScopesRoleDto);
      const resultExpected = [...addScopesRoleDto];

      const rolesHasScopeRepositoryHandleSpy = jest
        .spyOn(rolesHasScopeRepository, 'create')
        .mockResolvedValue(event.input);

      /**
       * Act
       */
      const result = await eventHandler.handle(event);

      /**
       * Assert
       */
      expect(rolesHasScopeRepositoryHandleSpy).toHaveBeenCalledWith(
        event.input,
      );
      expect(result).toStrictEqual(resultExpected);
    });
  });
});
