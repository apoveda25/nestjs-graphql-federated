import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { Scope } from '../entities/scope.entity';
import { ScopeModel } from './scope.model';

describe('ScopeModel', () => {
  let model: ScopeModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScopeModel],
    }).compile();

    model = module.get<ScopeModel>(ScopeModel);
  });

  it('should be defined', () => {
    expect(model).toBeDefined();
  });

  describe('create', () => {
    it('create scope without conflict', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const scope = Scope.of({
        _id: `Scopes/${_key}`,
        _key,
        name: faker.lorem.word(),
        action: faker.lorem.word(),
        collection: faker.lorem.word(),
        createdAt: Date.now(),
        updatedAt: 0,
        createdBy: `Users/${faker.datatype.uuid()}`,
        updatedBy: '',
      });
      const scopeConflict = null;
      const scopeCreated = { ...scope };

      /**
       * Act
       */
      const result = model.create(scope, scopeConflict);

      /**
       * Assert
       */
      expect(result).toEqual(scopeCreated);
    });

    it('create scope with conflict', async () => {
      /**
       * Arrange
       */
      const _key = faker.datatype.uuid();
      const scope = Scope.of({
        _id: `Scopes/${_key}`,
        _key,
        name: faker.lorem.word(),
        action: faker.lorem.word(),
        collection: faker.lorem.word(),
        createdAt: Date.now(),
        updatedAt: 0,
        createdBy: `Users/${faker.datatype.uuid()}`,
        updatedBy: '',
      });
      const scopeConflict = { ...scope };
      const scopeCreated = null;

      /**
       * Act
       */
      const result = model.create(scope, scopeConflict);

      /**
       * Assert
       */
      expect(result).toEqual(scopeCreated);
    });
  });
});
