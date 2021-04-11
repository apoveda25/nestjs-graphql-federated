import { UserAddRoleCommandHandler } from './user-add-role.handler';
import { UserCreateCommandHandler } from './user-create.handler';
import { UsersUpdateCommandHandler } from './users-update.handler';

export const UsersCommandHandlers = [
  UserCreateCommandHandler,
  UserAddRoleCommandHandler,
  UsersUpdateCommandHandler,
];
