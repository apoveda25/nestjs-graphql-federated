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
import { IContextUser } from '../../../shared/interfaces/context-graphql.interface';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../shared/interfaces/queries-resources.interface';
import { CurrentResourcePipe } from '../../../shared/pipes/current-resource.pipe';
import { FiltersResourcesPipe } from '../../../shared/pipes/filters-resources.pipe';
import { FindResourcePipe } from '../../../shared/pipes/find-resource.pipe';
import { SortResourcesPipe } from '../../../shared/pipes/sort-resources.pipe';
import {
  FILTER_DEFAULT,
  PAGINATION_DEFAULT,
  SORT_DEFAULT,
} from '../../../shared/queries.constant';
import { UserChangeRoleCommand } from '../../users-has-role/application/commands/impl/user-change-role.command';
import { UserHasRoleOutQuery } from '../../users-has-role/application/queries/impl/user-has-role-out.query';
import { ChangeRoleUserDto } from '../../users-has-role/domain/dto/change-role-user.dto';
import { ChangeRoleUserInput } from '../../users-has-role/domain/dto/change-role-user.input';
import { ChangeRoleUserPipe } from '../../users-has-role/domain/pipes/change-role-user.pipe';
import { UserCreateCommand } from '../application/commands/impl/user-create.command';
import { UsersUpdateCommand } from '../application/commands/impl/users-update.command';
import { UserFindQuery } from '../application/queries/impl/user-find.query';
import { UsersCountQuery } from '../application/queries/impl/users-count.query';
import { UsersSearchQuery } from '../application/queries/impl/users-search.query';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { CreateUserInput } from '../domain/dto/create-user.input';
import { FilterUserInput } from '../domain/dto/filter-user.input';
import { FindUserInput } from '../domain/dto/find-user.input';
import { SortUserInput } from '../domain/dto/sort-user.input';
import { UpdateUserDto } from '../domain/dto/update-user.dto';
import { UpdateUserInput } from '../domain/dto/update-user.input';
import { User } from '../domain/entities/user.entity';
import { CreateUserPipe } from '../domain/pipes/create-user.pipe';
import { UpdateUsersPipe } from '../domain/pipes/update-users.pipe';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => User, { name: 'userCreate' })
  @Authorization(PermissionsEnum.usersCreate, PermissionsEnum.usersHasRoleAdd)
  async create(
    @Args(
      {
        name: 'user',
        type: () => CreateUserInput,
      },
      CreateUserPipe,
      new ValidationPipe({ expectedType: CreateUserDto }),
    )
    createUserDto: CreateUserDto,

    @Context('user') context: IContextUser,
  ) {
    return await this.commandBus.execute(
      new UserCreateCommand(createUserDto, context),
    );
  }

  @UsePipes(UpdateUsersPipe)
  @Mutation(() => [User], { name: 'usersUpdate' })
  @Authorization(PermissionsEnum.usersUpdate)
  async update(
    @Args(
      {
        name: 'users',
        type: () => [UpdateUserInput],
      },
      new ParseArrayPipe({ items: UpdateUserDto }),
    )
    updateUserDto: UpdateUserDto[],
  ) {
    return await this.commandBus.execute(new UsersUpdateCommand(updateUserDto));
  }

  @Query(() => User, { name: 'userCurrent' })
  @Authorization(PermissionsEnum.usersFind)
  async current(@Context('user', CurrentResourcePipe) filters: IFilterToAQL[]) {
    return await this.queryBus.execute(new UserFindQuery(filters));
  }

  @Query(() => User, { name: 'userFind', nullable: true })
  @Authorization(PermissionsEnum.usersFind)
  async find(
    @Args(
      {
        name: 'filters',
        type: () => FindUserInput,
      },
      new ValidationPipe({ expectedType: FindUserInput }),
      FindResourcePipe,
    )
    filters: IFilterToAQL[],
  ) {
    return await this.queryBus.execute(new UserFindQuery(filters));
  }

  @Query(() => [User], { name: 'usersSearch' })
  @Authorization(PermissionsEnum.usersSearch)
  async search(
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
      new UsersSearchQuery({ filters, sort, pagination }),
    );
  }

  @Query(() => Int, { name: 'usersCount' })
  @Authorization(PermissionsEnum.usersCount)
  async count(
    @Args(
      'filters',
      {
        type: () => FilterUserInput,
        nullable: true,
      },
      FiltersResourcesPipe,
    )
    filters: IFilterToAQL[] = FILTER_DEFAULT,
  ) {
    return await this.queryBus.execute(new UsersCountQuery(filters));
  }

  @ResolveField()
  @Authorization(PermissionsEnum.usersHasRoleRead)
  async role(@Parent() { _id }: User) {
    return await this.queryBus.execute(
      new UserHasRoleOutQuery({ parentId: _id }),
    );
  }

  @Mutation(() => Boolean, { name: 'userChangeRole' })
  @Authorization(PermissionsEnum.usersHasRoleChange)
  async changeRole(
    @Args(
      {
        name: 'role',
        type: () => ChangeRoleUserInput,
      },
      ChangeRoleUserPipe,
      new ValidationPipe({ expectedType: ChangeRoleUserDto }),
    )
    changeRoleUserDto: ChangeRoleUserDto,

    @Context('user') context: IContextUser,
  ) {
    return await this.commandBus.execute(
      new UserChangeRoleCommand(changeRoleUserDto, context),
    );
  }
}
