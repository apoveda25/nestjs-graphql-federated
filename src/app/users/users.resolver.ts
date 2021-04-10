import { ParseArrayPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindResourcePipe } from '../../shared/pipes/find-resource.pipe';
import { UserCreateCommand } from './commands/impl/user-create.command';
import { UsersUpdateCommand } from './commands/impl/users-update.command';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserInput } from './dto/create-user.input';
import { FindUserInput } from './dto/find-user.input';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { UpdateUsersPipe } from './pipes/update-users.pipe';
import { UserFindQuery } from './queries/impl/user-find.query';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UsePipes(CreateUserPipe)
  @Mutation(() => User, { name: 'userCreate' })
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

  @UsePipes(FindResourcePipe)
  @Query(() => User, { name: 'userFind' })
  async find(
    @Args(
      {
        name: 'filters',
        type: () => FindUserInput,
      },
      new ValidationPipe({ expectedType: FindUserInput }),
    )
    findUserInput: FindUserInput,
  ) {
    return await this.queryBus.execute(new UserFindQuery(findUserInput));
  }

  // @UsePipes(SearchResourcesPipe)
  // @Query(() => [Role], { name: 'rolesSearch' })
  // async search(
  //   @Args('filters', {
  //     type: () => FilterRoleInput,
  //     nullable: true,
  //   })
  //   filters: IFilterToAQL[] = FILTER_DEFAULT,

  //   @Args('sort', {
  //     type: () => SortRoleInput,
  //     nullable: true,
  //   })
  //   sort: ISortToAQL[] = SORT_DEFAULT,

  //   @Args('pagination', {
  //     type: () => PaginationInput,
  //     nullable: true,
  //   })
  //   pagination: PaginationInput = PAGINATION_DEFAULT,
  // ) {
  //   return await this.queryBus.execute(
  //     new RolesSearchQuery({ filters, sort, pagination }),
  //   );
  // }
}
