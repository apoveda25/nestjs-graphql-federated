import { UserCreateCommandHandler } from './user-create.handler';
import { UserHasRoleCreateCommandHandler } from './users-has-role/user-has-role-create.handler';
import { UserHasRoleUpdateCommandHandler } from './users-has-role/user-has-role-update.handler';
import { UsersUpdateCommandHandler } from './users-update.handler';

export const UsersCommandHandlers = [
  UserCreateCommandHandler,
  UsersUpdateCommandHandler,
  UserHasRoleCreateCommandHandler,
  UserHasRoleUpdateCommandHandler,
];
