import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ContextGraphQL } from '../../shared/interfaces/context-graphql.interface';
import { ScopesCreateCommand } from './commands/impl/scopes-create.command';
import { Scope } from './entities/scope.entity';
import { ScopesResolver } from './scopes.resolver';

describe('ScopesResolver', () => {
  let resolver: ScopesResolver;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScopesResolver, CommandBus, QueryBus],
    }).compile();

    resolver = module.get<ScopesResolver>(ScopesResolver);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(commandBus).toBeDefined();
    expect(queryBus).toBeDefined();
  });

  describe('create', () => {
    it('should create an array of scopes', async () => {
      /**
       * Arrange
       */
      const context: ContextGraphQL = {
        _id: 'Users/20f736ce-b6a0-4ed5-8062-47d32c844d3d',
        role: 'client',
      };

      const resultExpected: Scope[] = [
        {
          _id: 'Scopes/20f736ce-b6a0-4ed5-8062-47d32c844d3d',
          _key: '20f736ce-b6a0-4ed5-8062-47d32c844d3d',
          name: 'scopes_create',
          action: 'CREATE',
          collection: 'Scopes',
          createdAt: Date.now(),
          updatedAt: 0,
          createdBy: context._id,
          updatedBy: '',
        },
      ];

      jest
        .spyOn(commandBus, 'execute')
        .mockReturnValue(new Promise((resolve) => resolve(resultExpected)));

      /**
       * Act
       */
      const result = await resolver.create(context);

      /**
       * Assert
       */
      expect(commandBus.execute).toHaveBeenCalledWith(
        new ScopesCreateCommand(context._id),
      );
      expect(result).toEqual(resultExpected);
    });
  });
});
