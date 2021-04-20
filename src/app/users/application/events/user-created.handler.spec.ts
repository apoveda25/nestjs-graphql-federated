import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { delta } from '../../../../shared/helpers/delta';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { UserCreatedEvent } from '../impl/user-created.event';
import { UserCreatedEventHandler } from './user-created.handler';

describe('UserCreatedEventHandler', () => {
  let eventHandler: UserCreatedEventHandler;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCreatedEventHandler,
        {
          provide: UsersRepository,
          useFactory: () => ({ create: jest.fn() }),
        },
      ],
    }).compile();

    eventHandler = module.get<UserCreatedEventHandler>(UserCreatedEventHandler);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(eventHandler).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('handle', () => {
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
        roleId: `Users/${_key}`,
      };
      const event = new UserCreatedEvent(createUserDto);
      const resultExpected = { ...createUserDto };

      const usersRepositoryHandleSpy = jest
        .spyOn(usersRepository, 'create')
        .mockResolvedValue(createUserDto);

      /**
       * Act
       */
      const result = await eventHandler.handle(event);

      /**
       * Assert
       */
      expect(usersRepositoryHandleSpy).toHaveBeenCalledWith(createUserDto);
      expect(result).toStrictEqual(resultExpected);
    });
  });
});
