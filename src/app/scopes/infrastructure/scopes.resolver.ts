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
import { RolesHasScopeInboundQuery } from '../../roles/application/queries/impl/roles-has-scope/roles-has-scope-inbound.query';
import { FilterRoleInput } from '../../roles/domain/dto/filter-role.input';
import { SortRoleInput } from '../../roles/domain/dto/sort-role.input';
import { Role } from '../../roles/domain/entities/role.entity';
import { ScopesCreateCommand } from '../application/commands/impl/scopes-create.command';
import { ScopesDeleteCommand } from '../application/commands/impl/scopes-delete.command';
import { ScopesInitCommand } from '../application/commands/impl/scopes-init.command';
import { ScopeFindQuery } from '../application/queries/impl/scope-find.query';
import { ScopesCountQuery } from '../application/queries/impl/scopes-count.query';
import { ScopesSearchQuery } from '../application/queries/impl/scopes-search.query';
import { CreateScopeDto } from '../domain/dto/create-scope.dto';
import { CreateScopeInput } from '../domain/dto/create-scope.input';
import { DeleteScopeDto } from '../domain/dto/delete-scope.dto';
import { DeleteScopeInput } from '../domain/dto/delete-scope.input';
import { FilterScopeInput } from '../domain/dto/filter-scope.input';
import { FindScopeInput } from '../domain/dto/find-scope.input';
import { SortScopeInput } from '../domain/dto/sort-scope.input';
import { Scope } from '../domain/entities/scope.entity';
import { PermissionsEnum } from '../domain/enums/permissions.enum';
import { CreateScopesPipe } from '../domain/pipes/create-scopes.pipe';
import { DeleteScopesPipe } from '../domain/pipes/delete-scopes.pipe';

@Resolver(() => Scope)
export class ScopesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => [Scope], {
    name: 'scopesInit',
  })
  @Authorization(PermissionsEnum.scopesCreateAll)
  async init(@Context() context: IContextGraphQL) {
    return await this.commandBus.execute(
      new ScopesInitCommand(context.user._id),
    );
  }

  @UsePipes(CreateScopesPipe)
  @Mutation(() => [Scope])
  @Authorization(PermissionsEnum.scopesCreateAll)
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

  @UsePipes(DeleteScopesPipe)
  @Mutation(() => [Scope])
  @Authorization(PermissionsEnum.scopesDeleteAll)
  async scopesDelete(
    @Args(
      {
        name: 'scopes',
        type: () => [DeleteScopeInput],
      },
      new ParseArrayPipe({ items: DeleteScopeDto }),
    )
    deleteScopesDto: DeleteScopeDto[],
  ) {
    return await this.commandBus.execute(
      new ScopesDeleteCommand(deleteScopesDto),
    );
  }

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

  @ResolveField()
  @Authorization(PermissionsEnum.scopesInRoles)
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
      new RolesHasScopeInboundQuery({
        filters,
        sort,
        pagination,
        parentId: _id,
      }),
    );
  }
}
