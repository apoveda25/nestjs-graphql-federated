import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { CreateRoleDto } from '../../dto/create-role.dto';
import { RoleCreatedEvent } from '../../events/impl/role-created.event';
import { RoleModel } from '../../models/role.model';
import { RolesRepository } from '../../repositories/roles.repository';
import { RoleCreateCommand } from '../impl/role-create.command';
import { RoleCreateCommandHandler } from './role-create.handler';

describe('RoleCreateCommandHandler', () => {
  let commandHandler: RoleCreateCommandHandler;
  let rolesRepository: RolesRepository;
  let roleModel: RoleModel;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleCreateCommandHandler,
        {
          provide: RolesRepository,
          useFactory: () => ({ getCollections: jest.fn(), findOr: jest.fn() }),
        },
        {
          provide: RoleModel,
          useFactory: () => ({ create: jest.fn() }),
        },
        {
          provide: EventBus,
          useFactory: () => ({
            publish: jest.fn(),
          }),
        },
      ],
    }).compile();

    commandHandler = module.get<RoleCreateCommandHandler>(
      RoleCreateCommandHandler,
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
    it('should create a role', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const createRoleDto: CreateRoleDto = {
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
      const command = new RoleCreateCommand(createRoleDto);
      const roleConflict = null;
      const roleCreated = { ...createRoleDto };
      const roleCreatedEvent = new RoleCreatedEvent(roleCreated);
      const resultExpected = { ...roleCreated };

      const rolesRepositoryFindOrSpy = jest
        .spyOn(rolesRepository, 'findOr')
        .mockResolvedValue(roleConflict);

      const roleModelCreateSpy = jest
        .spyOn(roleModel, 'create')
        .mockReturnValue(roleCreated);

      const eventBusPublishSpy = jest.spyOn(eventBus, 'publish');

      /**
       * Act
       */
      const result = await commandHandler.execute(command);

      /**
       * Assert
       */
      expect(rolesRepositoryFindOrSpy).toHaveBeenCalledWith({
        _key: command.role._key,
        name: command.role.name,
      });
      expect(roleModelCreateSpy).toHaveBeenCalledWith(command.role, {
        withKey: roleConflict,
      });
      expect(eventBusPublishSpy).toHaveBeenCalledWith(roleCreatedEvent);
      expect(result).toEqual(resultExpected);
    });
  });
});
