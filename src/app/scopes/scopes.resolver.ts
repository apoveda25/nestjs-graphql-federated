import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { ContextGraphQL } from '../../shared/interfaces/context-graphql.interface';
import { ScopesCreateCommand } from './commands/impl/scopes-create.command';
import { Scope } from './entities/scope.entity';

@Resolver(() => Scope)
export class ScopesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => [Scope], {
    name: 'scopesCreate',
  })
  async create(@Context('user') user: ContextGraphQL) {
    return await this.commandBus.execute(new ScopesCreateCommand(user._id));
  }

  // @Query(() => [Scope], { name: 'scopes' })
  // findAll() {
  //   return this.scopesService.findAll();
  // }

  // @Query(() => Scope, { name: 'scope' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.scopesService.findOne(id);
  // }

  // @Mutation(() => Scope)
  // updateScope(@Args('updateScopeInput') updateScopeInput: UpdateScopeInput) {
  //   return this.scopesService.update(updateScopeInput.id, updateScopeInput);
  // }

  // @Mutation(() => Scope)
  // removeScope(@Args('id', { type: () => Int }) id: number) {
  //   return this.scopesService.remove(id);
  // }
}
