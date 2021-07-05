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
import { Authorization } from '../../../shared/decorators/authorization.decorator';
import { PaginationInput } from '../../../shared/dto/pagination.input';
import { PermissionsEnum } from '../../../shared/enums/permissions';
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
import { RoleAddScopesCommand } from '../../roles-has-scope/application/commands/impl/role-add-scopes.command';
import { RoleRemoveScopesCommand } from '../../roles-has-scope/application/commands/impl/role-remove-scopes.command';
import { RoleHasScopeOutQuery } from '../../roles-has-scope/application/queries/impl/role-has-scope-out.query';
import { AddScopesRoleDto } from '../../roles-has-scope/domain/dto/add-scopes-role.dto';
import { AddScopesRoleInput } from '../../roles-has-scope/domain/dto/add-scopes-role.input';
import { RemoveScopesRoleDto } from '../../roles-has-scope/domain/dto/remove-scopes-role.dto';
import { RemoveScopesRoleInput } from '../../roles-has-scope/domain/dto/remove-scopes-role.input';
import { AddScopesRolePipe } from '../../roles-has-scope/domain/pipes/add-scopes-role.pipe';
import { RemoveScopesRolePipe } from '../../roles-has-scope/domain/pipes/remove-scopes-role.pipe';
import { FilterScopeInput } from '../../scopes/domain/dto/filter-scope.input';
import { SortScopeInput } from '../../scopes/domain/dto/sort-scope.input';
import { UserHasRoleInQuery } from '../../users-has-role/application/queries/impl/user-has-role-in.query';
import { FilterUserInput } from '../../users/domain/dto/filter-user.input';
import { SortUserInput } from '../../users/domain/dto/sort-user.input';
import { RoleCreateCommand } from '../application/commands/impl/role-create.command';
import { RolesDeleteCommand } from '../application/commands/impl/roles-delete.command';
import { RolesUpdateCommand } from '../application/commands/impl/roles-update.command';
import { RoleFindQuery } from '../application/queries/impl/role-find.query';
import { RolesCountQuery } from '../application/queries/impl/roles-count.query';
import { RolesSearchQuery } from '../application/queries/impl/roles-search.query';
import { CreateRoleDto } from '../domain/dto/create-role.dto';
import { CreateRoleInput } from '../domain/dto/create-role.input';
import { DeleteRoleDto } from '../domain/dto/delete-role.dto';
import { DeleteRoleInput } from '../domain/dto/delete-role.input';
import { FilterRoleInput } from '../domain/dto/filter-role.input';
import { FindRoleInput } from '../domain/dto/find-role.input';
import { SortRoleInput } from '../domain/dto/sort-role.input';
import { UpdateRoleDto } from '../domain/dto/update-role.dto';
import { UpdateRoleInput } from '../domain/dto/update-role.input';
import { Role } from '../domain/entities/role.entity';
import { CreateRolePipe } from '../domain/pipes/create-role.pipe';
import { DeleteRolesPipe } from '../domain/pipes/delete-roles.pipe';
import { UpdateRolesPipe } from '../domain/pipes/update-roles.pipe';

@Resolver(() => Role)
export class RolesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UsePipes(CreateRolePipe)
  @Mutation(() => Role, { name: 'roleCreate' })
  @Authorization(PermissionsEnum.rolesCreate)
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
  @Authorization(PermissionsEnum.rolesUpdate)
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
  @Authorization(PermissionsEnum.rolesDelete)
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

  @Query(() => Role, { name: 'roleFind' })
  @Authorization(PermissionsEnum.rolesFind)
  async find(
    @Args(
      {
        name: 'filters',
        type: () => FindRoleInput,
      },
      new ValidationPipe({ expectedType: FindRoleInput }),
      FindResourcePipe,
    )
    filters: IFilterToAQL[],
  ) {
    return await this.queryBus.execute(new RoleFindQuery(filters));
  }

  @Query(() => [Role], { name: 'rolesSearch' })
  @Authorization(PermissionsEnum.rolesSearch)
  async search(
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
      new RolesSearchQuery({ filters, sort, pagination }),
    );
  }

  @Query(() => Int, { name: 'rolesCount' })
  @Authorization(PermissionsEnum.rolesCount)
  async count(
    @Args(
      'filters',
      {
        type: () => FilterRoleInput,
        nullable: true,
      },
      FiltersResourcesPipe,
    )
    filters: IFilterToAQL[] = FILTER_DEFAULT,
  ) {
    return await this.queryBus.execute(new RolesCountQuery(filters));
  }

  @ResolveField()
  @Authorization(PermissionsEnum.usersHasRoleRead)
  async users(
    @Parent() { _id }: Role,

    @Args(
      'filters',
      {
        type: () => FilterUserInput,
        nullable: true,
      },
      FiltersResourcesPipe,
    )
    filters: IFilterToAQL[] = FILTER_DEFAULT,

    @Args(
      'sort',
      {
        type: () => SortUserInput,
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
      new UserHasRoleInQuery({
        filters,
        sort,
        pagination,
        parentId: _id,
      }),
    );
  }

  @ResolveField()
  @Authorization(PermissionsEnum.rolesHasScopeRead)
  async scopes(
    @Parent() { _id }: Role,

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
  @Authorization(PermissionsEnum.rolesHasScopeAdd)
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
  @Authorization(PermissionsEnum.rolesHasScopeRemove)
  async removeScopes(
    @Args(
      {
        name: 'role',
        type: () => RemoveScopesRoleInput,
      },
      new ParseArrayPipe({ items: RemoveScopesRoleDto }),
    )
    removeScopesRoleDto: RemoveScopesRoleDto[],
  ) {
    return await this.commandBus.execute(
      new RoleRemoveScopesCommand(removeScopesRoleDto),
    );
  }
}
