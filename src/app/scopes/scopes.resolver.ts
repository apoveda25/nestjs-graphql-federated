import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ScopesService } from './scopes.service';
import { Scope } from './entities/scope.entity';
import { CreateScopeInput } from './dto/create-scope.input';
import { UpdateScopeInput } from './dto/update-scope.input';

@Resolver(() => Scope)
export class ScopesResolver {
  constructor(private readonly scopesService: ScopesService) {}

  @Mutation(() => Scope)
  createScope(@Args('createScopeInput') createScopeInput: CreateScopeInput) {
    return this.scopesService.create(createScopeInput);
  }

  @Query(() => [Scope], { name: 'scopes' })
  findAll() {
    return this.scopesService.findAll();
  }

  @Query(() => Scope, { name: 'scope' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.scopesService.findOne(id);
  }

  @Mutation(() => Scope)
  updateScope(@Args('updateScopeInput') updateScopeInput: UpdateScopeInput) {
    return this.scopesService.update(updateScopeInput.id, updateScopeInput);
  }

  @Mutation(() => Scope)
  removeScope(@Args('id', { type: () => Int }) id: number) {
    return this.scopesService.remove(id);
  }
}
