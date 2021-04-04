import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { DeleteRoleDto } from '../../dto/delete-role.dto';
import { RolesRepository } from '../../repositories/roles.repository';
import { RolesDeletedEvent } from '../impl/roles-deleted.event';
import { RolesDeletedEventHandlers } from './roles-deleted.handlers';

describe('RolesDeletedEventHandlers', () => {
  let eventHandler: RolesDeletedEventHandlers;
  let rolesRepository: RolesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesDeletedEventHandlers,
        {
          provide: RolesRepository,
          useFactory: () => ({ delete: jest.fn() }),
        },
      ],
    }).compile();

    eventHandler = module.get<RolesDeletedEventHandlers>(
      RolesDeletedEventHandlers,
    );
    rolesRepository = module.get<RolesRepository>(RolesRepository);
  });

  it('should be defined', () => {
    expect(eventHandler).toBeDefined();
    expect(rolesRepository).toBeDefined();
  });

  describe('handle', () => {
    it('should delete roles', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const deleteRoleDto: DeleteRoleDto = { _id: `Roles/${_key}`, _key };
      const resultExpected = {
        ...deleteRoleDto,
        name: faker.random.word(),
        description: faker.random.words(10),
        active: true,
        default: false,
        updatedAt: Date.now(),
        updatedBy: `Users/${_key}`,
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
      };
      const event = new RolesDeletedEvent([deleteRoleDto]);

      const rolesRepositoryHandleSpy = jest
        .spyOn(rolesRepository, 'delete')
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
