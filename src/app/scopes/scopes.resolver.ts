import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../arangodb/providers/object-to-aql.interface';
import { PaginationInput } from '../../shared/dto/pagination.input';
import { ContextGraphQL } from '../../shared/interfaces/context-graphql.interface';
import { CountResourcesPipe } from '../../shared/pipes/count-resources.pipe';
import { FindResourcePipe } from '../../shared/pipes/find-resource.pipe';
import { SearchResourcesPipe } from '../../shared/pipes/search-resources.pipe';
import {
  FILTER_DEFAULT,
  PAGINATION_DEFAULT,
  SORT_DEFAULT,
} from '../../shared/queries.constant';
import { ScopesCreateCommand } from './commands/impl/scopes-create.command';
import { FilterScopeInput } from './dto/filter-scope.input';
import { FindScopeInput } from './dto/find-scope.input';
import { SortScopeInput } from './dto/sort-scope.input';
import { Scope } from './entities/scope.entity';
import { ScopeFindQuery } from './queries/impl/scope-find.query';
import { ScopesCountQuery } from './queries/impl/scopes-count.query';
import { ScopesSearchQuery } from './queries/impl/scopes-search.query';

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

  // @Authorization(Permission.UsersSearch)
  @UsePipes(SearchResourcesPipe)
  @Query(() => [Scope], { name: 'scopesSearch' })
  async search(
    @Args('filters', {
      type: () => FilterScopeInput,
      nullable: true,
    })
    filters: IFilterToAQL[] = FILTER_DEFAULT,

    @Args('sort', {
      type: () => SortScopeInput,
      nullable: true,
    })
    sort: ISortToAQL[] = SORT_DEFAULT,

    @Args('pagination', {
      type: () => PaginationInput,
      nullable: true,
    })
    pagination: PaginationInput = PAGINATION_DEFAULT,
  ) {
    return await this.queryBus.execute(
      new ScopesSearchQuery({ filters, sort, pagination }),
    );
  }

  // @Authorization(Permission.UsersSearch)
  @UsePipes(CountResourcesPipe)
  @Query(() => Int, { name: 'scopesCount' })
  async count(
    @Args('filters', {
      type: () => FilterScopeInput,
      nullable: true,
    })
    filters: IFilterToAQL[] = FILTER_DEFAULT,
  ) {
    return await this.queryBus.execute(new ScopesCountQuery({ filters }));
  }
}
