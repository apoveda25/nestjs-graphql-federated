import { ParseArrayPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserCreateCommand } from './commands/impl/user-create.command';
import { UsersUpdateCommand } from './commands/impl/users-update.command';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { UpdateUsersPipe } from './pipes/update-users.pipe';

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

  // @UsePipes(UpdateUsersPipe)
  // @Mutation(() => [User], { name: 'usersDelete' })
  // async delete(
  //   @Args(
  //     {
  //       name: 'users',
  //       type: () => [UpdateUserInput],
  //     },
  //     new ParseArrayPipe({ items: UpdateUserDto }),
  //   )
  //   updateUserDto: UpdateUserDto[],
  // ) {
  //   return await this.commandBus.execute(new UsersUpdateCommand(updateUserDto));
  // }

  // @Query(() => [User], { name: 'users' })
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}
