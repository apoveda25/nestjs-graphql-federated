import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { RemoveScopesRoleDto } from '../../dto/remove-scopes-role.dto';
import { RolesHasScopeRepository } from '../../repositories/roles-has-scope.repository';
import { RoleRemovedScopesEvent } from '../impl/role-removed-scopes.event';
import { RoleRemovedScopesEventHandler } from './role-removed-scopes.handler';

describe('RoleRemovedScopesEventHandler', () => {
  let eventHandler: RoleRemovedScopesEventHandler;
  let rolesHasScopeRepository: RolesHasScopeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleRemovedScopesEventHandler,
        {
          provide: RolesHasScopeRepository,
          useFactory: () => ({ delete: jest.fn() }),
        },
      ],
    }).compile();

    eventHandler = module.get<RoleRemovedScopesEventHandler>(
      RoleRemovedScopesEventHandler,
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
    it('should delete scopes of role', async () => {
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
      const event = new RoleRemovedScopesEvent(removeScopesRoleDto);
      const resultExpected = [...removeScopesRoleDto];

      const rolesHasScopeRepositoryDeleteSpy = jest
        .spyOn(rolesHasScopeRepository, 'delete')
        .mockResolvedValue(event.input);

      /**
       * Act
       */
      const result = await eventHandler.handle(event);

      /**
       * Assert
       */
      expect(rolesHasScopeRepositoryDeleteSpy).toHaveBeenCalledWith(
        event.input,
      );
      expect(result).toStrictEqual(resultExpected);
    });
  });
});
