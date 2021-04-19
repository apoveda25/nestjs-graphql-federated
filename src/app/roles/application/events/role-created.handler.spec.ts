import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { CreateRoleDto } from '../../domain/dto/create-role.dto';
import { RolesRepository } from '../../infrastructure/repositories/roles.repository';
import { RoleCreatedEvent } from '../impl/role-created.event';
import { RoleCreatedEventHandler } from './role-created.handler';

describe('RoleCreatedEventHandler', () => {
  let eventHandler: RoleCreatedEventHandler;
  let rolesRepository: RolesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleCreatedEventHandler,
        {
          provide: RolesRepository,
          useFactory: () => ({ create: jest.fn() }),
        },
      ],
    }).compile();

    eventHandler = module.get<RoleCreatedEventHandler>(RoleCreatedEventHandler);
    rolesRepository = module.get<RolesRepository>(RolesRepository);
  });

  it('should be defined', () => {
    expect(eventHandler).toBeDefined();
    expect(rolesRepository).toBeDefined();
  });

  describe('handle', () => {
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
      const event = new RoleCreatedEvent(createRoleDto);
      const resultExpected = { ...createRoleDto };

      const rolesRepositoryHandleSpy = jest
        .spyOn(rolesRepository, 'create')
        .mockResolvedValue(event.role);

      /**
       * Act
       */
      const result = await eventHandler.handle(event);

      /**
       * Assert
       */
      expect(rolesRepositoryHandleSpy).toHaveBeenCalledWith(event.role);
      expect(result).toStrictEqual(resultExpected);
    });
  });
});
