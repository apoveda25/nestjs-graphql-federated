import { ParseArrayPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RoleCreateCommand } from './commands/impl/role-create.command';
import { RolesUpdateCommand } from './commands/impl/roles-update.command';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { CreateRolePipe } from './pipes/create-role.pipe';
import { UpdateRolesPipe } from './pipes/update-roles.pipe';

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
  async updateRole(
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

  // @Query(() => [Role], { name: 'roles' })
  // findAll() {
  //   return this.rolesService.findAll();
  // }

  // @Query(() => Role, { name: 'role' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.rolesService.findOne(id);
  // }

  // @Mutation(() => Role)
  // removeRole(@Args('id', { type: () => Int }) id: number) {
  //   return this.rolesService.remove(id);
  // }
}
