import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../arangodb/providers/object-to-aql.interface';
import { Authorization } from '../../shared/decorators/authorization.decorator';
import { PaginationInput } from '../../shared/dto/pagination.input';
import { AuthorizationEnum } from '../../shared/enums/authorization';
import { IContextGraphQL } from '../../shared/interfaces/context-graphql.interface';
import { CountResourcesPipe } from '../../shared/pipes/count-resources.pipe';
import { FindResourcePipe } from '../../shared/pipes/find-resource.pipe';
import { SearchResourcesPipe } from '../../shared/pipes/search-resources.pipe';
import {
  FILTER_DEFAULT,
  PAGINATION_DEFAULT,
  SORT_DEFAULT,
} from '../../shared/queries.constant';
import { RoleHasScopeInQuery } from '../roles-has-scope/application/queries/impl/role-has-scope-in.query';
import { FilterRoleInput } from '../roles/domain/dto/filter-role.input';
import { SortRoleInput } from '../roles/domain/dto/sort-role.input';
import { Role } from '../roles/domain/entities/role.entity';
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
  @Authorization(AuthorizationEnum.scopesCreate)
  async create(@Context() context: IContextGraphQL) {
    return await this.commandBus.execute(
      new ScopesCreateCommand(context.user._id),
    );
  }

  @UsePipes(FindResourcePipe)
  @Query(() => Scope, { name: 'scopeFind', nullable: true })
  @Authorization(AuthorizationEnum.scopesFind)
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

  @UsePipes(SearchResourcesPipe)
  @Query(() => [Scope], { name: 'scopesSearch' })
  @Authorization(AuthorizationEnum.scopesSearch)
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

  @UsePipes(CountResourcesPipe)
  @Query(() => Int, { name: 'scopesCount' })
  @Authorization(AuthorizationEnum.scopesCount)
  async count(
    @Args('filters', {
      type: () => FilterScopeInput,
      nullable: true,
    })
    filters: IFilterToAQL[] = FILTER_DEFAULT,
  ) {
    return await this.queryBus.execute(new ScopesCountQuery({ filters }));
  }

  @UsePipes(SearchResourcesPipe)
  @ResolveField()
  @Authorization(AuthorizationEnum.rolesHasScopeRead)
  async roles(
    @Parent() { _id }: Role,

    @Args('filters', {
      type: () => FilterRoleInput,
      nullable: true,
    })
    filters: IFilterToAQL[] = FILTER_DEFAULT,

    @Args('sort', {
      type: () => SortRoleInput,
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
      new RoleHasScopeInQuery({
        filters,
        sort,
        pagination,
        parentId: _id,
      }),
    );
  }
}
