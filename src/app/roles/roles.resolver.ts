import { ParseArrayPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindResourcePipe } from '../../shared/pipes/find-resource.pipe';
import { RoleCreateCommand } from './commands/impl/role-create.command';
import { RolesDeleteCommand } from './commands/impl/roles-delete.command';
import { RolesUpdateCommand } from './commands/impl/roles-update.command';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreateRoleInput } from './dto/create-role.input';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { DeleteRoleInput } from './dto/delete-role.input';
import { FindRoleDto } from './dto/find-role.dto';
import { FindRoleInput } from './dto/find-role.input';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { CreateRolePipe } from './pipes/create-role.pipe';
import { DeleteRolesPipe } from './pipes/delete-roles.pipe';
import { UpdateRolesPipe } from './pipes/update-roles.pipe';
import { RoleFindQuery } from './queries/impl/role-find.query';

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

  // @Query(() => Role, { name: 'role' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.rolesService.findOne(id);
  // }
}
