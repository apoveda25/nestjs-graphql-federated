import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { Role } from '../../../domain/entities/role.entity';
import { RolesRepository } from '../../../infrastructure/repositories/roles.repository';
import { RoleFindQuery } from '../impl/role-find.query';
import { RoleFindQueryHandler } from './role-find.handler';

describe('RoleFindQueryHandler', () => {
  let queryHandler: RoleFindQueryHandler;
  let rolesRepository: RolesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleFindQueryHandler,
        {
          provide: RolesRepository,
          useFactory: () => ({ findOr: jest.fn() }),
        },
      ],
    }).compile();

    queryHandler = module.get<RoleFindQueryHandler>(RoleFindQueryHandler);
    rolesRepository = module.get<RolesRepository>(RolesRepository);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
    expect(rolesRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should find a role', async () => {
      /**
       * Arrange
       */
      const input = { name: 'client' };
      const query = new RoleFindQuery(input);
      const _key = faker.datatype.uuid();
      const resultExpected: Role = {
        _id: `Roles/${_key}`,
        _key,
        name: input.name,
        description: faker.lorem.words(),
        active: true,
        default: false,
        createdAt: Date.now(),
        updatedAt: 0,
        createdBy: `Users/${faker.datatype.uuid()}`,
        updatedBy: '',
      };

      const repositoryFindOrSpy = jest
        .spyOn(rolesRepository, 'findOr')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await queryHandler.execute(query);

      /**
       * Assert
       */
      expect(repositoryFindOrSpy).toHaveBeenCalledWith(query.input);
      expect(result).toEqual(resultExpected);
    });
  });
});
