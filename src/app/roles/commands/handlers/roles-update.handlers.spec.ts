import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { IRoleUpdateConflits } from '../../../../../dist/app/roles/interfaces/role.interfaces';
import { Role } from '../../entities/role.entity';
import { RolesUpdatedEvent } from '../../events/impl/roles-updated.event';
import { RoleModel } from '../../models/role.model';
import { RolesRepository } from '../../repositories/roles.repository';
import { RolesUpdateCommand } from '../impl/roles-update.command';
import { RolesUpdateCommandHandlers } from './roles-update.handlers';

describe('RolesUpdateCommandHandlers', () => {
  let commandHandler: RolesUpdateCommandHandlers;
  let rolesRepository: RolesRepository;
  let roleModel: RoleModel;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesUpdateCommandHandlers,
        {
          provide: RolesRepository,
          useFactory: () => ({ findOr: jest.fn() }),
        },
        {
          provide: RoleModel,
          useFactory: () => ({ update: jest.fn() }),
        },
        {
          provide: EventBus,
          useFactory: () => ({
            publish: jest.fn(),
          }),
        },
      ],
    }).compile();

    commandHandler = module.get<RolesUpdateCommandHandlers>(
      RolesUpdateCommandHandlers,
    );
    rolesRepository = module.get<RolesRepository>(RolesRepository);
    roleModel = module.get<RoleModel>(RoleModel);
    eventBus = module.get<EventBus>(EventBus);
  });

  it('should be defined', () => {
    expect(commandHandler).toBeDefined();
    expect(rolesRepository).toBeDefined();
    expect(roleModel).toBeDefined();
    expect(eventBus).toBeDefined();
  });

  describe('execute', () => {
    it('should update roles', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const updateRoleDto = {
        _id: `Roles/${_key}`,
        _key,
        name: faker.random.word(),
        description: faker.random.words(10),
        active: true,
        default: true,
        updatedAt: Date.now(),
        updatedBy: `Users/${_key}`,
      };
      const command = new RolesUpdateCommand([updateRoleDto]);
      const roleConflictKey: Role = {
        ...updateRoleDto,
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
      };
      const roleConflictName = null;
      const roleConflictDefault = null;
      const roleConflicts: IRoleUpdateConflits = {
        withKey: roleConflictKey,
        withName: roleConflictName,
        withDefault: roleConflictDefault,
      };
      const resultExpected = { ...roleConflictKey };
      const rolesUpdatedEvent = new RolesUpdatedEvent([resultExpected]);

      const rolesRepositoryFindOrSpy = jest
        .spyOn(rolesRepository, 'findOr')
        .mockResolvedValueOnce(roleConflictKey)
        .mockResolvedValueOnce(roleConflictName)
        .mockResolvedValueOnce(roleConflictDefault);

      const roleModelUpdateSpy = jest
        .spyOn(roleModel, 'update')
        .mockReturnValue(resultExpected);

      const eventBusPublishSpy = jest.spyOn(eventBus, 'publish');

      /**
       * Act
       */
      const result = await commandHandler.execute(command);

      /**
       * Assert
       */
      expect(rolesRepositoryFindOrSpy).toHaveBeenCalledWith({ _key });
      expect(rolesRepositoryFindOrSpy).toHaveBeenCalledWith({
        name: updateRoleDto.name,
      });
      expect(rolesRepositoryFindOrSpy).toHaveBeenCalledWith({
        default: updateRoleDto.default,
      });
      expect(roleModelUpdateSpy).toHaveBeenCalledWith(
        updateRoleDto,
        roleConflicts,
      );
      expect(eventBusPublishSpy).toHaveBeenCalledWith(rolesUpdatedEvent);
      expect(result).toEqual([resultExpected]);
    });
  });
});
