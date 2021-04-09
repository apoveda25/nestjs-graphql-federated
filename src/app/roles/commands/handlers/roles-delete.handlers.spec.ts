import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { IEdgeSearchInput } from '../../../../shared/interfaces/edge.interface';
import { DeleteRoleDto } from '../../dto/delete-role.dto';
import { Role } from '../../entities/role.entity';
import { RolesDeletedEvent } from '../../events/impl/roles-deleted.event';
import { RoleModel } from '../../models/role.model';
import { RolesRepository } from '../../repositories/roles.repository';
import { RolesDeleteCommand } from '../impl/roles-delete.command';
import { RolesDeleteCommandHandlers } from './roles-delete.handlers';

describe('RolesDeleteCommandHandlers', () => {
  let commandHandler: RolesDeleteCommandHandlers;
  let rolesRepository: RolesRepository;
  let roleModel: RoleModel;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesDeleteCommandHandlers,
        {
          provide: RolesRepository,
          useFactory: () => ({
            findOr: jest.fn(),
            searchEdgeConnections: jest.fn(),
          }),
        },
        {
          provide: RoleModel,
          useFactory: () => ({ delete: jest.fn() }),
        },
        {
          provide: EventBus,
          useFactory: () => ({
            publish: jest.fn(),
          }),
        },
      ],
    }).compile();

    commandHandler = module.get<RolesDeleteCommandHandlers>(
      RolesDeleteCommandHandlers,
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
    it('should delete roles', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const deleteRoleDto: DeleteRoleDto = { _id: `Roles/${_key}`, _key };
      const input: IEdgeSearchInput = {
        direction: 'ANY',
        startVertexId: `Roles/${_key}`,
        collections: ['UsersHasRole', 'RolesHasScope'],
      };
      const roleConflictKey: Role = {
        ...deleteRoleDto,
        name: faker.random.word(),
        description: faker.random.words(10),
        active: true,
        default: true,
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
        updatedAt: Date.now(),
        updatedBy: `Users/${_key}`,
      };
      const roleConflictEdgeConnections = [];
      const command = new RolesDeleteCommand([deleteRoleDto]);
      const event = new RolesDeletedEvent([roleConflictKey]);
      const resultExpected = [roleConflictKey];

      const rolesRepositoryFindOrSpy = jest
        .spyOn(rolesRepository, 'findOr')
        .mockResolvedValue(roleConflictKey);

      const rolesRepositorySearchEdgeConnectionsSpy = jest
        .spyOn(rolesRepository, 'searchEdgeConnections')
        .mockResolvedValue(roleConflictEdgeConnections);

      const roleModelDeleteSpy = jest
        .spyOn(roleModel, 'delete')
        .mockReturnValue(roleConflictKey);

      const eventBusPublishSpy = jest.spyOn(eventBus, 'publish');

      /**
       * Act
       */
      const result = await commandHandler.execute(command);

      /**
       * Assert
       */
      expect(rolesRepositoryFindOrSpy).toHaveBeenCalledWith({ _key });
      expect(rolesRepositorySearchEdgeConnectionsSpy).toHaveBeenCalledWith(
        input,
      );
      expect(roleModelDeleteSpy).toHaveBeenCalledWith(deleteRoleDto, {
        withKey: roleConflictKey,
        withEdges: roleConflictEdgeConnections,
      });
      expect(eventBusPublishSpy).toHaveBeenCalledWith(event);
      expect(result).toEqual(resultExpected);
    });
  });
});
