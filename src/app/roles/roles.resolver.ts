import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RoleCreateCommand } from './commands/impl/role-create.command';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './entities/role.entity';
import { CreateRolesPipe } from './pipes/create-roles.pipe';

@Resolver(() => Role)
export class RolesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UsePipes(CreateRolesPipe)
  @Mutation(() => Role, { name: 'roleCreate' })
  async create(
    @Args(
      {
        name: 'role',
        type: () => CreateRoleInput,
      },
      new ValidationPipe({ expectedType: CreateRoleInput }),
    )
    createRoleInput: CreateRoleInput,
  ) {
    return await this.commandBus.execute(
      new RoleCreateCommand(createRoleInput),
    );
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
  // updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
  //   return this.rolesService.update(updateRoleInput.id, updateRoleInput);
  // }

  // @Mutation(() => Role)
  // removeRole(@Args('id', { type: () => Int }) id: number) {
  //   return this.rolesService.remove(id);
  // }
}
