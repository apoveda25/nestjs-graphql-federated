import { ValidationPipe } from '@nestjs/common';
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
import { Authorization } from '../../../shared/decorators/authorization.decorator';
import { PaginationInput } from '../../../shared/dto/pagination.input';
import { AuthorizationEnum } from '../../../shared/enums/authorization';
import { IContextGraphQL } from '../../../shared/interfaces/context-graphql.interface';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../shared/interfaces/queries-resources.interface';
import { FiltersResourcesPipe } from '../../../shared/pipes/filters-resources.pipe';
import { FindResourcePipe } from '../../../shared/pipes/find-resource.pipe';
import { SortResourcesPipe } from '../../../shared/pipes/sort-resources.pipe';
import {
  FILTER_DEFAULT,
  PAGINATION_DEFAULT,
  SORT_DEFAULT,
} from '../../../shared/queries.constant';
import { RoleHasScopeInQuery } from '../../roles-has-scope/application/queries/impl/role-has-scope-in.query';
import { FiltersSearchScopesDontBelongRoleInput } from '../../roles-has-scope/domain/dto/filters-search-scopes-dont-belong-role.input';
import { FilterRoleInput } from '../../roles/domain/dto/filter-role.input';
import { SortRoleInput } from '../../roles/domain/dto/sort-role.input';
import { Role } from '../../roles/domain/entities/role.entity';
import { ScopesCreateCommand } from '../application/commands/impl/scopes-create.command';
import { ScopeFindQuery } from '../application/queries/impl/scope-find.query';
import { ScopesCountQuery } from '../application/queries/impl/scopes-count.query';
import { ScopesSearchFilterByRoleQuery } from '../application/queries/impl/scopes-search-filter-by-role.query';
import { ScopesSearchQuery } from '../application/queries/impl/scopes-search.query';
import { FilterScopeInput } from '../domain/dto/filter-scope.input';
import { FindScopeInput } from '../domain/dto/find-scope.input';
import { SortScopeInput } from '../domain/dto/sort-scope.input';
import { Scope } from '../domain/entities/scope.entity';

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

  @Query(() => Scope, { name: 'scopeFind', nullable: true })
  @Authorization(AuthorizationEnum.scopesFind)
  async find(
    @Args(
      {
        name: 'find',
        type: () => FindScopeInput,
      },
      new ValidationPipe({ expectedType: FindScopeInput }),
      FindResourcePipe,
    )
    filters: IFilterToAQL[],
  ) {
    return await this.queryBus.execute(new ScopeFindQuery(filters));
  }

  @Query(() => [Scope], { name: 'scopesSearch' })
  @Authorization(AuthorizationEnum.scopesSearch)
  async search(
    @Args(
      'filters',
      {
        type: () => FilterScopeInput,
        nullable: true,
      },
      FiltersResourcesPipe,
    )
    filters: IFilterToAQL[] = FILTER_DEFAULT,

    @Args(
      'sort',
      {
        type: () => SortScopeInput,
        nullable: true,
      },
      SortResourcesPipe,
    )
    sort: ISortToAQL = SORT_DEFAULT,

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

  @Query(() => Int, { name: 'scopesCount' })
  @Authorization(AuthorizationEnum.scopesCount)
  async count(
    @Args(
      'filters',
      {
        type: () => FilterScopeInput,
        nullable: true,
      },
      FiltersResourcesPipe,
    )
    filters: IFilterToAQL[] = FILTER_DEFAULT,
  ) {
    return await this.queryBus.execute(new ScopesCountQuery({ filters }));
  }

  @Query(() => [Scope], { name: 'scopesSearchDontBelongRole' })
  @Authorization(
    AuthorizationEnum.scopesSearch,
    AuthorizationEnum.rolesHasScopeRead,
  )
  async searchDontBelongRole(
    @Args(
      'filters',
      {
        type: () => FiltersSearchScopesDontBelongRoleInput,
      },
      new ValidationPipe({
        expectedType: FiltersSearchScopesDontBelongRoleInput,
      }),
      FindResourcePipe,
    )
    filters: IFilterToAQL[] = FILTER_DEFAULT,

    @Args(
      'sort',
      {
        type: () => SortScopeInput,
        nullable: true,
      },
      SortResourcesPipe,
    )
    sort: ISortToAQL = SORT_DEFAULT,

    @Args('pagination', {
      type: () => PaginationInput,
      nullable: true,
    })
    pagination: PaginationInput = PAGINATION_DEFAULT,
  ) {
    return await this.queryBus.execute(
      new ScopesSearchFilterByRoleQuery({
        filters,
        sort,
        pagination,
      }),
    );
  }

  @ResolveField()
  @Authorization(AuthorizationEnum.rolesHasScopeRead)
  async roles(
    @Parent() { _id }: Role,

    @Args(
      'filters',
      {
        type: () => FilterRoleInput,
        nullable: true,
      },
      FiltersResourcesPipe,
    )
    filters: IFilterToAQL[] = FILTER_DEFAULT,

    @Args(
      'sort',
      {
        type: () => SortRoleInput,
        nullable: true,
      },
      SortResourcesPipe,
    )
    sort: ISortToAQL = SORT_DEFAULT,

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
