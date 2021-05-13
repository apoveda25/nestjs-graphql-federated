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
import { AuthorizationEnum } from 'src/shared/enums/authorization';
import { Authorization } from '../../../shared/decorators/authorization.decorator';
import { PaginationInput } from '../../../shared/dto/pagination.input';
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
import { SortRoleInput } from '../../roles/domain/dto/sort-role.input';
import { UserChangeRoleCommand } from '../../users-has-role/application/commands/impl/user-change-role.command';
import { ChangeRoleUserPipe } from '../../users-has-role/application/pipes/change-role-user.pipe';
import { UserHasRoleOutQuery } from '../../users-has-role/application/queries/impl/user-has-role-out.query';
import { ChangeRoleUserDto } from '../../users-has-role/domain/dto/change-role-user.dto';
import { ChangeRoleUserInput } from '../../users-has-role/domain/dto/change-role-user.input';
import { UserCreateCommand } from '../application/commands/impl/user-create.command';
import { UsersUpdateCommand } from '../application/commands/impl/users-update.command';
import { CreateUserPipe } from '../application/pipes/create-user.pipe';
import { UpdateUsersPipe } from '../application/pipes/update-users.pipe';
import { UserFindQuery } from '../application/queries/impl/user-find.query';
import { UsersCountQuery } from '../application/queries/impl/users-count.query';
import { UsersSearchQuery } from '../application/queries/impl/users-search.query';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { CreateUserInput } from '../domain/dto/create-user.input';
import { FilterUserInput } from '../domain/dto/filter-user.input';
import { FindUserInput } from '../domain/dto/find-user.input';
import { UpdateUserDto } from '../domain/dto/update-user.dto';
import { UpdateUserInput } from '../domain/dto/update-user.input';
import { User } from '../domain/entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UsePipes(CreateUserPipe)
  @Mutation(() => User, { name: 'userCreate' })
  @Authorization(
    AuthorizationEnum.usersCreate,
    AuthorizationEnum.usersHasRoleAdd,
  )
  async create(
    @Args(
      {
        name: 'user',
        type: () => CreateUserInput,
      },
      new ValidationPipe({ expectedType: CreateUserDto }),
    )
    createUserDto: CreateUserDto,
  ) {
    return await this.commandBus.execute(new UserCreateCommand(createUserDto));
  }

  @UsePipes(UpdateUsersPipe)
  @Mutation(() => [User], { name: 'usersUpdate' })
  @Authorization(AuthorizationEnum.usersUpdate)
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

  @Query(() => User, { name: 'userFind', nullable: true })
  @Authorization(AuthorizationEnum.usersFind)
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
  @Authorization(AuthorizationEnum.usersSearch)
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
      new UsersSearchQuery({ filters, sort, pagination }),
    );
  }

  @Query(() => Int, { name: 'usersCount' })
  @Authorization(AuthorizationEnum.usersCount)
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
  @Authorization(AuthorizationEnum.usersHasRoleRead)
  async role(@Parent() { _id }: User) {
    return await this.queryBus.execute(
      new UserHasRoleOutQuery({ parentId: _id }),
    );
  }

  @UsePipes(ChangeRoleUserPipe)
  @Mutation(() => Boolean, { name: 'userChangeRole' })
  @Authorization(AuthorizationEnum.usersHasRoleChange)
  async changeRole(
    @Args(
      {
        name: 'role',
        type: () => ChangeRoleUserInput,
      },
      new ValidationPipe({ expectedType: ChangeRoleUserDto }),
    )
    changeRoleUserDto: ChangeRoleUserDto,
  ) {
    return await this.commandBus.execute(
      new UserChangeRoleCommand(changeRoleUserDto),
    );
  }
}
