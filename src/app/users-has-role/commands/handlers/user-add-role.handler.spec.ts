import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { AddRoleUserDto } from '../../dto/add-role-user.dto';
import { UserAddedRoleEvent } from '../../events/impl/user-added-role.event';
import { UserAddRoleCommand } from '../impl/user-add-role.command';
import { UserAddRoleCommandHandler } from './user-add-role.handler';

describe('UserAddRoleCommandHandler', () => {
  let commandHandler: UserAddRoleCommandHandler;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAddRoleCommandHandler,
        {
          provide: EventBus,
          useFactory: () => ({
            publish: jest.fn(),
          }),
        },
      ],
    }).compile();

    commandHandler = module.get<UserAddRoleCommandHandler>(
      UserAddRoleCommandHandler,
    );
    eventBus = module.get<EventBus>(EventBus);
  });

  it('should be defined', () => {
    expect(commandHandler).toBeDefined();
    expect(eventBus).toBeDefined();
  });

  describe('execute', () => {
    it('should add a role to user', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const addRoleUserDto: AddRoleUserDto = {
        _from: `Users/${_key}`,
        _to: `Roles/${_key}`,
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
      };
      const command = new UserAddRoleCommand(addRoleUserDto);
      const userAddedRoleEvent = new UserAddedRoleEvent(command.edge);
      const resultExpected = true;

      const eventBusPublishSpy = jest.spyOn(eventBus, 'publish');

      /**
       * Act
       */
      const result = await commandHandler.execute(command);

      /**
       * Assert
       */
      expect(eventBusPublishSpy).toHaveBeenCalledWith(userAddedRoleEvent);
      expect(result).toEqual(resultExpected);
    });
  });
});
