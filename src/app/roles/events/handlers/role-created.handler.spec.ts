// import { Test, TestingModule } from '@nestjs/testing';
// import * as faker from 'faker';
// import { Scope } from '../../entities/scope.entity';
// import { ScopesRepository } from '../../repositories/scopes.repository';
// import { ScopeCreatedEventHandler } from './role-created.handler';

// describe('ScopeCreatedEventHandler', () => {
//   let eventHandler: ScopeCreatedEventHandler;
//   let scopesRepository: ScopesRepository;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ScopeCreatedEventHandler,
//         {
//           provide: ScopesRepository,
//           useFactory: () => ({ create: jest.fn() }),
//         },
//       ],
//     }).compile();

//     eventHandler = module.get<ScopeCreatedEventHandler>(
//       ScopeCreatedEventHandler,
//     );
//     scopesRepository = module.get<ScopesRepository>(ScopesRepository);
//   });

//   it('should be defined', () => {
//     expect(eventHandler).toBeDefined();
//     expect(scopesRepository).toBeDefined();
//   });

//   describe('handle', () => {
//     it('create scopes', async () => {
//       /**
//        * Arrange
//        */
//       const _key = faker.datatype.uuid();
//       const createScope = Scope.of({
//         _id: `Scopes/${_key}`,
//         _key,
//         name: faker.lorem.word(),
//         action: faker.lorem.word(),
//         collection: faker.lorem.word(),
//         createdAt: Date.now(),
//         updatedAt: 0,
//         createdBy: `Users/${faker.datatype.uuid()}`,
//         updatedBy: '',
//       });
//       const event = { input: createScope };

//       const scopesRepositoryHandleSpy = jest
//         .spyOn(scopesRepository, 'create')
//         .mockResolvedValue([createScope]);

//       /**
//        * Act
//        */
//       const result = await eventHandler.handle(event);

//       /**
//        * Assert
//        */
//       expect(scopesRepositoryHandleSpy).toHaveBeenCalledWith([event.input]);
//       expect(result).toStrictEqual([createScope]);
//     });
//   });
// });
