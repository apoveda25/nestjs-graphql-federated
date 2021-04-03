import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { InputTransform } from '../../arangodb/providers/input-transform';
import { RoleCreateCommand } from './commands/impl/role-create.command';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreateRolePipe } from './pipes/create-role.pipe';
import { RolesResolver } from './roles.resolver';

describe('RolesResolver', () => {
  let resolver: RolesResolver;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesResolver,
        {
          provide: CommandBus,
          useFactory: () => ({ execute: jest.fn() }),
        },
        {
          provide: QueryBus,
          useFactory: () => ({ execute: jest.fn() }),
        },
        {
          provide: InputTransform,
          useFactory: () => ({
            filtersToArray: jest.fn(),
            sortToArray: jest.fn(),
          }),
        },
      ],
    })
      .overridePipe(CreateRolePipe)
      .useValue({})
      .compile();

    resolver = module.get<RolesResolver>(RolesResolver);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(commandBus).toBeDefined();
    expect(queryBus).toBeDefined();
  });

  describe('create', () => {
    it('should create a role', async () => {
      /**
       * Arrange
       */
      const _key = '20f736ce-b6a0-4ed5-8062-47d32c844d3d';
      const createRoleDto: CreateRoleDto = {
        _id: `Roles/${_key}`,
        _key,
        name: 'client',
        description: '',
        active: true,
        default: false,
        createdAt: Date.now(),
        updatedAt: 0,
        createdBy: `Users/${_key}`,
        updatedBy: '',
      };
      const roleCreateCommand = new RoleCreateCommand(createRoleDto);
      const resultExpected = { ...createRoleDto };

      const commandBusExecuteSpy = jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await resolver.create(createRoleDto);

      /**
       * Assert
       */
      expect(commandBusExecuteSpy).toHaveBeenCalledWith(roleCreateCommand);
      expect(result).toEqual(resultExpected);
    });
  });
});
