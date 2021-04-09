import { UserAddRoleCommandHandler } from './user-add-role.handler';
import { UserCreateCommandHandler } from './user-create.handler';

export const UsersCommandHandlers = [
  UserCreateCommandHandler,
  UserAddRoleCommandHandler,
];
