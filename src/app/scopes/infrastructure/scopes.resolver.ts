import { ParseArrayPipe, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { PermissionsEnum } from '../../../shared/enums/permissions';
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
import { ScopesInitCommand } from '../application/commands/impl/scopes-init.command';
import { ScopeFindQuery } from '../application/queries/impl/scope-find.query';
import { ScopesCountQuery } from '../application/queries/impl/scopes-count.query';
import { ScopesSearchDontBelongRoleQuery } from '../application/queries/impl/scopes-search-dont-belong-role.query';
import { ScopesSearchQuery } from '../application/queries/impl/scopes-search.query';
import { CreateScopeDto } from '../domain/dto/create-scope.dto';
import { CreateScopeInput } from '../domain/dto/create-scope.input';
import { FilterScopeInput } from '../domain/dto/filter-scope.input';
import { FindScopeInput } from '../domain/dto/find-scope.input';
import { SortScopeInput } from '../domain/dto/sort-scope.input';
import { Scope } from '../domain/entities/scope.entity';
import { CreateScopePipe } from '../domain/pipes/create-scope.pipe';
import { CreateScopesPipe } from '../domain/pipes/create-scopes.pipe';

@Resolver(() => Scope)
export class ScopesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => [Scope], {
    name: 'scopesInit',
  })
  @Authorization(PermissionsEnum.scopesCreate)
  async init(@Context() context: IContextGraphQL) {
    return await this.commandBus.execute(
      new ScopesInitCommand(context.user._id),
    );
  }

  @UsePipes(CreateScopePipe)
  @Mutation(() => Scope)
  @Authorization(PermissionsEnum.scopesCreate)
  async scopeCreate(
    @Args(
      {
        name: 'scope',
        type: () => CreateScopeInput,
      },
      new ValidationPipe({ expectedType: CreateScopeDto }),
    )
    createScopeDto: CreateScopeDto,
  ) {
    return await this.commandBus.execute(
      new ScopesCreateCommand([createScopeDto]),
    );
  }

  @UsePipes(CreateScopesPipe)
  @Mutation(() => [Scope])
  @Authorization(PermissionsEnum.scopesCreate)
  async scopesCreate(
    @Args(
      {
        name: 'scopes',
        type: () => [CreateScopeInput],
      },
      new ParseArrayPipe({ items: CreateScopeDto }),
    )
    createScopesDto: CreateScopeDto[],
  ) {
    return await this.commandBus.execute(
      new ScopesCreateCommand(createScopesDto),
    );
  }

  // @Mutation(() => [Scope], {
  //   name: 'scopesDelete',
  // })
  // @Authorization(PermissionsEnum.scopesDelete)
  // async delete(
  //   @Args(
  //     {
  //       name: 'scopes',
  //       type: () => [DeleteScopeInput],
  //     },
  //     new ParseArrayPipe({ items: DeleteScopeInput }),
  //   )
  //   createScopeDto: CreateScopeDto,
  // ) {
  //   return await this.commandBus.execute(
  //     new ScopesInitCommand(context.user._id),
  //   );
  // }

  @Query(() => Scope, { name: 'scopeFind', nullable: true })
  @Authorization(PermissionsEnum.scopesFind)
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
  @Authorization(PermissionsEnum.scopesSearch)
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
  @Authorization(PermissionsEnum.scopesCount)
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
    PermissionsEnum.scopesSearch,
    PermissionsEnum.rolesHasScopeRead,
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
    filters: IFilterToAQL[],

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
      new ScopesSearchDontBelongRoleQuery({
        filters,
        sort,
        pagination,
      }),
    );
  }

  @ResolveField()
  @Authorization(PermissionsEnum.rolesHasScopeRead)
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
