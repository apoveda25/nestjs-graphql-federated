import { ParseArrayPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../arangodb/providers/object-to-aql.interface';
import { PaginationInput } from '../../shared/dto/pagination.input';
import { FindResourcePipe } from '../../shared/pipes/find-resource.pipe';
import { SearchResourcesPipe } from '../../shared/pipes/search-resources.pipe';
import {
  FILTER_DEFAULT,
  PAGINATION_DEFAULT,
  SORT_DEFAULT,
} from '../../shared/queries.constant';
import { RoleCreateCommand } from './commands/impl/role-create.command';
import { RolesDeleteCommand } from './commands/impl/roles-delete.command';
import { RolesUpdateCommand } from './commands/impl/roles-update.command';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreateRoleInput } from './dto/create-role.input';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { DeleteRoleInput } from './dto/delete-role.input';
import { FilterRoleInput } from './dto/filter-role.input';
import { FindRoleDto } from './dto/find-role.dto';
import { FindRoleInput } from './dto/find-role.input';
import { SortRoleInput } from './dto/sort-role.input';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { CreateRolePipe } from './pipes/create-role.pipe';
import { DeleteRolesPipe } from './pipes/delete-roles.pipe';
import { UpdateRolesPipe } from './pipes/update-roles.pipe';
import { RoleFindQuery } from './queries/impl/role-find.query';
import { RolesSearchQuery } from './queries/impl/roles-search.query';

@Resolver(() => Role)
export class RolesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UsePipes(CreateRolePipe)
  @Mutation(() => Role, { name: 'roleCreate' })
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
  async find(
    @Args(
      {
        name: 'filters',
        type: () => FindRoleInput,
      },
      new ValidationPipe({ expectedType: FindRoleDto }),
    )
    findRoleDto: FindRoleDto,
  ) {
    return await this.queryBus.execute(new RoleFindQuery(findRoleDto));
  }

  @UsePipes(SearchResourcesPipe)
  @Query(() => [Role], { name: 'rolesSearch' })
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

  // @Query(() => Role, { name: 'role' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.rolesService.findOne(id);
  // }
}
