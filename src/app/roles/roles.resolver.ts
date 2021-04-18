import { ParseArrayPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Args,
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
import { CountResourcesPipe } from '../../shared/pipes/count-resources.pipe';
import { FindResourcePipe } from '../../shared/pipes/find-resource.pipe';
import { SearchResourcesPipe } from '../../shared/pipes/search-resources.pipe';
import {
  FILTER_DEFAULT,
  PAGINATION_DEFAULT,
  SORT_DEFAULT,
} from '../../shared/queries.constant';
import { AddScopesRoleDto } from '../roles-has-scope/dto/add-scopes-role.dto';
import { AddScopesRoleInput } from '../roles-has-scope/dto/add-scopes-role.input';
import { RemoveScopesRoleDto } from '../roles-has-scope/dto/remove-scopes-role.dto';
import { RemoveScopesRoleInput } from '../roles-has-scope/dto/remove-scopes-role.input';
import { AddScopesRolePipe } from '../roles-has-scope/pipes/add-scopes-role.pipe';
import { RemoveScopesRolePipe } from '../roles-has-scope/pipes/remove-scopes-role.pipe';
import { RoleHasScopeOutQuery } from '../roles-has-scope/queries/impl/role-has-scope-out.query';
import { FilterScopeInput } from '../scopes/dto/filter-scope.input';
import { SortScopeInput } from '../scopes/dto/sort-scope.input';
import { UserHasRoleInQuery } from '../users-has-role/queries/impl/user-has-role-in.query';
import { FilterUserInput } from '../users/dto/filter-user.input';
import { SortUserInput } from '../users/dto/sort-user.input';
import { RoleAddScopesCommand } from './commands/impl/role-add-scopes.command';
import { RoleCreateCommand } from './commands/impl/role-create.command';
import { RoleRemoveScopesCommand } from './commands/impl/role-remove-scopes.command';
import { RolesDeleteCommand } from './commands/impl/roles-delete.command';
import { RolesUpdateCommand } from './commands/impl/roles-update.command';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreateRoleInput } from './dto/create-role.input';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { DeleteRoleInput } from './dto/delete-role.input';
import { FilterRoleInput } from './dto/filter-role.input';
import { FindRoleInput } from './dto/find-role.input';
import { SortRoleInput } from './dto/sort-role.input';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { CreateRolePipe } from './pipes/create-role.pipe';
import { DeleteRolesPipe } from './pipes/delete-roles.pipe';
import { UpdateRolesPipe } from './pipes/update-roles.pipe';
import { RoleFindQuery } from './queries/impl/role-find.query';
import { RolesCountQuery } from './queries/impl/roles-count.query';
import { RolesSearchQuery } from './queries/impl/roles-search.query';

@Resolver(() => Role)
export class RolesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UsePipes(CreateRolePipe)
  @Mutation(() => Role, { name: 'roleCreate' })
  @Authorization(AuthorizationEnum.rolesCreate)
  async create(
    @Args(
      {
        name: 'role',
        type: () => CreateRoleInput,
      },
      new ValidationPipe({ expectedType: CreateRoleDto }),
    )
    createRoleDto: CreateRoleDto,
  ) {
    return await this.commandBus.execute(new RoleCreateCommand(createRoleDto));
  }

  @UsePipes(UpdateRolesPipe)
  @Mutation(() => [Role], { name: 'rolesUpdate' })
  @Authorization(AuthorizationEnum.rolesUpdate)
  async update(
    @Args(
      {
        name: 'roles',
        type: () => [UpdateRoleInput],
      },
      new ParseArrayPipe({ items: UpdateRoleDto }),
    )
    updateRoleDto: UpdateRoleDto[],
  ) {
    return await this.commandBus.execute(new RolesUpdateCommand(updateRoleDto));
  }

  @UsePipes(DeleteRolesPipe)
  @Mutation(() => [Role], { name: 'rolesDelete' })
  @Authorization(AuthorizationEnum.rolesDelete)
  async delete(
    @Args(
      {
        name: 'roles',
        type: () => [DeleteRoleInput],
      },
      new ParseArrayPipe({ items: DeleteRoleDto }),
    )
    deleteRoleDto: DeleteRoleDto[],
  ) {
    return await this.commandBus.execute(new RolesDeleteCommand(deleteRoleDto));
  }

  @UsePipes(FindResourcePipe)
  @Query(() => Role, { name: 'roleFind' })
  @Authorization(AuthorizationEnum.rolesFind)
  async find(
    @Args(
      {
        name: 'filters',
        type: () => FindRoleInput,
      },
      new ValidationPipe({ expectedType: FindRoleInput }),
    )
    findRoleDto: FindRoleInput,
  ) {
    return await this.queryBus.execute(new RoleFindQuery(findRoleDto));
  }

  @UsePipes(SearchResourcesPipe)
  @Query(() => [Role], { name: 'rolesSearch' })
  @Authorization(AuthorizationEnum.rolesSearch)
  async search(
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
      new RolesSearchQuery({ filters, sort, pagination }),
    );
  }

  @UsePipes(CountResourcesPipe)
  @Query(() => Int, { name: 'rolesCount' })
  @Authorization(AuthorizationEnum.rolesCount)
  async count(
    @Args('filters', {
      type: () => FilterRoleInput,
      nullable: true,
    })
    filters: IFilterToAQL[] = FILTER_DEFAULT,
  ) {
    return await this.queryBus.execute(new RolesCountQuery(filters));
  }

  @UsePipes(SearchResourcesPipe)
  @ResolveField()
  @Authorization(AuthorizationEnum.usersHasRoleRead)
  async users(
    @Parent() { _id }: Role,

    @Args('filters', {
      type: () => FilterUserInput,
      nullable: true,
    })
    filters: IFilterToAQL[] = FILTER_DEFAULT,

    @Args('sort', {
      type: () => SortUserInput,
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
      new UserHasRoleInQuery({
        filters,
        sort,
        pagination,
        parentId: _id,
      }),
    );
  }

  @UsePipes(SearchResourcesPipe)
  @ResolveField()
  @Authorization(AuthorizationEnum.rolesHasScopeRead)
  async scopes(
    @Parent() { _id }: Role,

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
      new RoleHasScopeOutQuery({
        filters,
        sort,
        pagination,
        parentId: _id,
      }),
    );
  }

  @UsePipes(AddScopesRolePipe)
  @Mutation(() => Boolean, { name: 'roleAddScopes' })
  @Authorization(AuthorizationEnum.rolesHasScopeAdd)
  async addScopes(
    @Args(
      {
        name: 'role',
        type: () => AddScopesRoleInput,
      },
      new ParseArrayPipe({ items: AddScopesRoleDto }),
    )
    addScopesRoleDto: AddScopesRoleDto[],
  ): Promise<boolean> {
    return await this.commandBus.execute(
      new RoleAddScopesCommand(addScopesRoleDto),
    );
  }

  @UsePipes(RemoveScopesRolePipe)
  @Mutation(() => Boolean, { name: 'roleRemoveScopes' })
  @Authorization(AuthorizationEnum.rolesHasScopeRemove)
  async removeScopes(
    @Args(
      {
        name: 'role',
        type: () => RemoveScopesRoleInput,
      },
      new ValidationPipe({ expectedType: RemoveScopesRoleDto }),
    )
    removeScopesRoleDto: RemoveScopesRoleDto[],
  ) {
    return await this.commandBus.execute(
      new RoleRemoveScopesCommand(removeScopesRoleDto),
    );
  }
}
