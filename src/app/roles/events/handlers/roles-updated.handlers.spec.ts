import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { UpdateRoleDto } from '../../dto/update-role.dto';
import { RolesRepository } from '../../repositories/roles.repository';
import { RolesUpdatedEvent } from '../impl/roles-updated.event';
import { RolesUpdatedEventHandlers } from './roles-updated.handlers';

describe('RolesUpdatedEventHandlers', () => {
  let eventHandler: RolesUpdatedEventHandlers;
  let rolesRepository: RolesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesUpdatedEventHandlers,
        {
          provide: RolesRepository,
          useFactory: () => ({ update: jest.fn() }),
        },
      ],
    }).compile();

    eventHandler = module.get<RolesUpdatedEventHandlers>(
      RolesUpdatedEventHandlers,
    );
    rolesRepository = module.get<RolesRepository>(RolesRepository);
  });

  it('should be defined', () => {
    expect(eventHandler).toBeDefined();
    expect(rolesRepository).toBeDefined();
  });

  describe('handle', () => {
    it('should update roles', async () => {
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
      const resultExpected = {
        ...updateRoleDto,
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
      };
      const event = new RolesUpdatedEvent([updateRoleDto]);

      const rolesRepositoryHandleSpy = jest
        .spyOn(rolesRepository, 'update')
        .mockResolvedValue([resultExpected]);

      /**
       * Act
       */
      const result = await eventHandler.handle(event);

      /**
       * Assert
       */
      expect(rolesRepositoryHandleSpy).toHaveBeenCalledWith(event.roles);
      expect(result).toStrictEqual([resultExpected]);
    });
  });
});
