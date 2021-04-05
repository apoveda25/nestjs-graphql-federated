import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { Role } from '../../entities/role.entity';
import { RolesRepository } from '../../repositories/roles.repository';
import { RolesSearchQuery } from '../impl/roles-search.query';
import { RolesSearchQueryHandler } from './roles-search.handler';

describe('RolesSearchQueryHandler', () => {
  let queryHandler: RolesSearchQueryHandler;
  let rolesRepository: RolesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesSearchQueryHandler,
        {
          provide: RolesRepository,
          useFactory: () => ({ search: jest.fn() }),
        },
      ],
    }).compile();

    queryHandler = module.get<RolesSearchQueryHandler>(RolesSearchQueryHandler);
    rolesRepository = module.get<RolesRepository>(RolesRepository);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(rolesRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should search roles', async () => {
      /**
       * Arrange
       */
      const query = new RolesSearchQuery({
        filters: [],
        sort: [],
        pagination: { offset: 0, count: 1 },
      });
      const _key = faker.datatype.uuid();
      const resultExpected: Role[] = [
        {
          _id: `Roles/${_key}`,
          _key,
          name: faker.lorem.word(),
          description: faker.lorem.words(),
          active: true,
          default: false,
          createdAt: Date.now(),
          updatedAt: 0,
          createdBy: `Users/${faker.datatype.uuid()}`,
          updatedBy: '',
        },
      ];

      const repositorySearchSpy = jest
        .spyOn(rolesRepository, 'search')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await queryHandler.execute(query);

      /**
       * Assert
       */
      expect(repositorySearchSpy).toHaveBeenCalledWith(query.input);
      expect(result).toEqual(resultExpected);
    });
  });
});
