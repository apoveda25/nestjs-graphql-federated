import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContextGraphQL } from '../../shared/interfaces/context-graphql.interface';
import { FindResourcePipe } from '../../shared/pipes/find-resource.pipe';
import { ScopesCreateCommand } from './commands/impl/scopes-create.command';
import { FindScopeInput } from './dto/find-scope.input';
import { Scope } from './entities/scope.entity';
import { ScopeFindQuery } from './queries/impl/scope-find.query';

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

  @UsePipes(FindResourcePipe)
  @Query(() => Scope, { name: 'scopeFind' })
  async find(
    @Args(
      {
        name: 'find',
        type: () => FindScopeInput,
      },
      new ValidationPipe({ expectedType: FindScopeInput }),
    )
    findScopeInput: FindScopeInput,
  ) {
    return await this.queryBus.execute(new ScopeFindQuery(findScopeInput));
  }

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
