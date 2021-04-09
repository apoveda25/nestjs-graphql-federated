import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { RolesRepository } from '../../repositories/roles.repository';
import { RolesCountQuery } from '../impl/roles-count.query';
import { RolesCountQueryHandler } from './roles-count.handler';

describe('RolesCountQueryHandler', () => {
  let queryHandler: RolesCountQueryHandler;
  let rolesRepository: RolesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesCountQueryHandler,
        {
          provide: RolesRepository,
          useFactory: () => ({ count: jest.fn() }),
        },
      ],
    }).compile();

    queryHandler = module.get<RolesCountQueryHandler>(RolesCountQueryHandler);
    rolesRepository = module.get<RolesRepository>(RolesRepository);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(rolesRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should count roles', async () => {
      /**
       * Arrange
       */
      const query = new RolesCountQuery([]);
      const resultExpected = faker.datatype.number(500);

      const repositoryCountSpy = jest
        .spyOn(rolesRepository, 'count')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await queryHandler.execute(query);

      /**
       * Assert
       */
      expect(repositoryCountSpy).toHaveBeenCalledWith(query.filters);
      expect(result).toEqual(resultExpected);
    });
  });
});
