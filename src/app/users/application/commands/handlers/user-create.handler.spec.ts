import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { delta } from '../../../../../shared/helpers/delta';
import { RolesRepository } from '../../../../roles/infrastructure/repositories/roles.repository';
import { CreateUserDto } from '../../../domain/dto/create-user.dto';
import { UserModel } from '../../../domain/models/user.model';
import { UserCreatedEvent } from '../../../events/impl/user-created.event';
import { UsersRepository } from '../../../infrastructure/repositories/users.repository';
import { UserCreateCommand } from '../impl/user-create.command';
import { UserCreateCommandHandler } from './user-create.handler';

describe('UserCreateCommandHandler', () => {
  let commandHandler: UserCreateCommandHandler;
  let usersRepository: UsersRepository;
  let rolesRepository: RolesRepository;
  let userModel: UserModel;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCreateCommandHandler,
        {
          provide: UsersRepository,
          useFactory: () => ({ findOr: jest.fn() }),
        },
        {
          provide: RolesRepository,
          useFactory: () => ({ findOr: jest.fn() }),
        },
        {
          provide: UserModel,
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

    commandHandler = module.get<UserCreateCommandHandler>(
      UserCreateCommandHandler,
    );
    usersRepository = module.get<UsersRepository>(UsersRepository);
    rolesRepository = module.get<RolesRepository>(RolesRepository);
    userModel = module.get<UserModel>(UserModel);
    eventBus = module.get<EventBus>(EventBus);
  });

  it('should be defined', () => {
    expect(commandHandler).toBeDefined();
    expect(usersRepository).toBeDefined();
    expect(rolesRepository).toBeDefined();
    expect(userModel).toBeDefined();
    expect(eventBus).toBeDefined();
  });

  describe('execute', () => {
    it('should create a user', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const createUserDto: CreateUserDto = {
        _id: `Users/${_key}`,
        _key,
        password: 'secret123456',
        username: faker.name.firstName(),
        name: faker.name.firstName(),
        surname: faker.name.firstName(),
        email: faker.internet.email(),
        emailActive: false,
        emailCode: '000000',
        emailCodeExpire: Date.now() + delta({ days: 1 }),
        active: true,
        birthday: faker.date.past().getMilliseconds(),
        gender: faker.name.gender(),
        prefix: '',
        urlImage: '',
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
        updatedAt: 0,
        updatedBy: '',
        roleId: `Roles/${_key}`,
      };
      const command = new UserCreateCommand(createUserDto);
      const withKey = null;
      const withUsernameEmail = null;
      const withRoleId = {};
      const userCreated = { ...createUserDto };
      const userCreatedEvent = new UserCreatedEvent(userCreated);
      const resultExpected = { ...userCreated };

      const usersRepositoryFindOrSpy = jest
        .spyOn(usersRepository, 'findOr')
        .mockResolvedValueOnce(withKey)
        .mockResolvedValueOnce(withUsernameEmail);

      const rolesRepositoryFindOrSpy = jest
        .spyOn(rolesRepository, 'findOr')
        .mockImplementation(jest.fn().mockReturnValue(withRoleId));

      const userModelCreateSpy = jest
        .spyOn(userModel, 'create')
        .mockReturnValue(userCreated);

      const eventBusPublishSpy = jest.spyOn(eventBus, 'publish');

      /**
       * Act
       */
      const result = await commandHandler.execute(command);

      /**
       * Assert
       */
      expect(usersRepositoryFindOrSpy).toHaveBeenCalledWith({
        _key: command.user._key,
      });
      expect(usersRepositoryFindOrSpy).toHaveBeenCalledWith({
        username: command.user.username,
        email: command.user.email,
      });
      expect(rolesRepositoryFindOrSpy).toHaveBeenCalledWith({
        _id: command.user.roleId,
      });
      expect(userModelCreateSpy).toHaveBeenCalledWith(command.user, {
        withKey,
        withUsernameEmail,
        withRoleId,
      });
      expect(eventBusPublishSpy).toHaveBeenCalledWith(userCreatedEvent);
      expect(result).toEqual(resultExpected);
    });
  });
});
