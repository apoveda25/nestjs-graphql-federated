import { UserCreateCommandHandler } from './user-create.handler';
import { UsersHasRoleCreateCommandHandler } from './users-has-role/users-has-role-create.handler';
import { UsersHasRoleUpdateCommandHandler } from './users-has-role/users-has-role-update.handler';
import { UsersUpdateCommandHandler } from './users-update.handler';

export const UsersCommandHandlers = [
  UserCreateCommandHandler,
  UsersUpdateCommandHandler,
  UsersHasRoleCreateCommandHandler,
  UsersHasRoleUpdateCommandHandler,
];
