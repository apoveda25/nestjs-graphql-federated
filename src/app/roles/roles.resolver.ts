import { ParseArrayPipe, UsePipes } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { CreateRolesPipe } from './pipes/create-roles.pipe';
import { RolesService } from './services/roles.service';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @UsePipes(CreateRolesPipe)
  @Mutation(() => [Role], { name: 'rolesCreate' })
  create(
    @Args(
      {
        name: 'create',
        type: () => [CreateRoleInput],
      },
      new ParseArrayPipe({ items: CreateRoleInput }),
    )
    createRoleInput: CreateRoleInput[],
  ) {
    return this.rolesService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => Role)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.rolesService.update(updateRoleInput.id, updateRoleInput);
  }

  @Mutation(() => Role)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.remove(id);
  }
}
