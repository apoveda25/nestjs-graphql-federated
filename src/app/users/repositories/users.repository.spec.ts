import { Test, TestingModule } from '@nestjs/testing';
import { aql } from 'arangojs/aql';
import * as faker from 'faker';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { InputTransform } from '../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import { delta } from '../../../shared/helpers/delta';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserInput } from '../dto/find-role.input';
import { User } from '../entities/user.entity';
import { UsersRepository } from './users.repository';

describe('UsersRepository', () => {
  let provider: UsersRepository;
  let arangoService: ArangodbService;
  let objectToAQL: ObjectToAQL;
  let inputTransform: InputTransform;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: ArangodbService,
          useFactory: () => ({
            collection: jest.fn(),
            query: jest.fn(),
          }),
        },
        {
          provide: ObjectToAQL,
          useFactory: () => ({
            filtersToAql: jest.fn(),
            sortToAql: jest.fn(),
            paginationToAql: jest.fn(),
          }),
        },
        {
          provide: InputTransform,
          useFactory: () => ({
            resourceToArray: jest.fn(),
          }),
        },
      ],
    }).compile();

    provider = module.get<UsersRepository>(UsersRepository);
    arangoService = module.get<ArangodbService>(ArangodbService);
    objectToAQL = module.get<ObjectToAQL>(ObjectToAQL);
    inputTransform = module.get<InputTransform>(InputTransform);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
    expect(arangoService).toBeDefined();
    expect(objectToAQL).toBeDefined();
    expect(inputTransform).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      /**
       * Arrange
       */
      const name = 'Users';
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
      };
      const cursor = [createUserDto];
      const resultExpected = { ...createUserDto };

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue(cursor));

      const arangoServiceCollectionSpy = jest.spyOn(
        arangoService,
        'collection',
      );

      /**
       * Act
       */
      const result = await provider.create(createUserDto);

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(result).toEqual(resultExpected);
    });
  });

  describe('findOr', () => {
    it('should find a user', async () => {
      /**
       * Arrange
       */
      const name = 'Users';
      const _key = faker.datatype.uuid();
      const findUserDto: FindUserInput = { _key };
      const resultExpected: User = {
        _id: `Users/${_key}`,
        _key,
        username: faker.name.firstName(),
        name: faker.name.firstName(),
        surname: faker.name.firstName(),
        email: faker.internet.email(),
        emailActive: false,
        active: true,
        birthday: faker.date.past().getMilliseconds(),
        gender: faker.name.gender(),
        prefix: '',
        urlImage: '',
        createdAt: Date.now(),
        createdBy: `Users/${_key}`,
        updatedAt: 0,
        updatedBy: '',
      };
      const cursor = [resultExpected];

      const arangoServiceQuerySpy = jest
        .spyOn(arangoService, 'query')
        .mockImplementation(jest.fn().mockReturnValue(cursor));

      const arangoServiceCollectionSpy = jest.spyOn(
        arangoService,
        'collection',
      );

      aql.join = jest.fn();

      /**
       * Act
       */
      const result = await provider.findOr(findUserDto);

      /**
       * Assert
       */
      expect(arangoServiceQuerySpy).toHaveBeenCalled();
      expect(arangoServiceCollectionSpy).toHaveBeenCalledWith(name);
      expect(result).toEqual(resultExpected);
    });
  });
});
