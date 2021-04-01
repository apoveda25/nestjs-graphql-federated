import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ContextGraphQL } from '../../shared/interfaces/context-graphql.interface';
import { ScopesCreateCommand } from './commands/impl/scopes-create.command';
import { ScopeFindQuery } from './queries/impl/scope-find.query';
import { ScopesResolver } from './scopes.resolver';

describe('ScopesResolver', () => {
  let resolver: ScopesResolver;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScopesResolver,
        {
          provide: CommandBus,
          useFactory: () => ({ execute: jest.fn() }),
        },
        QueryBus,
      ],
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
      const scopesCreateCommand = new ScopesCreateCommand(context._id);

      const resultExpected = [
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

      const commandBusExecuteSpy = jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await resolver.create(context);

      /**
       * Assert
       */
      expect(commandBusExecuteSpy).toHaveBeenCalledWith(scopesCreateCommand);
      expect(result).toEqual(resultExpected);
    });
  });

  describe('find', () => {
    it('should find a scope', async () => {
      /**
       * Arrange
       */
      const findScopeInput = { _key: '20f736ce-b6a0-4ed5-8062-47d32c844d3d' };
      const createdBy = 'Users/20f736ce-b6a0-4ed5-8062-47d32c844d3d';
      const scopeFindQuery = new ScopeFindQuery(findScopeInput);

      const resultExpected = {
        _id: `Scopes/${findScopeInput._key}`,
        _key: findScopeInput._key,
        name: 'scopes_create',
        action: 'CREATE',
        collection: 'Scopes',
        createdAt: Date.now(),
        updatedAt: 0,
        createdBy,
        updatedBy: '',
      };

      const queryBusExecuteSpy = jest
        .spyOn(queryBus, 'execute')
        .mockResolvedValue(resultExpected);

      /**
       * Act
       */
      const result = await resolver.find(findScopeInput);

      /**
       * Assert
       */
      expect(queryBusExecuteSpy).toHaveBeenCalledWith(scopeFindQuery);
      expect(result).toEqual(resultExpected);
    });
  });
});
