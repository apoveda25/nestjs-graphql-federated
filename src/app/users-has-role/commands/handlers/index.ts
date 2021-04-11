import { UserAddRoleCommandHandler } from './user-add-role.handler';
import { UserChangeRoleCommandHandler } from './user-change-role.handler';

export const UsersHasRoleCommandHandlers = [
  UserAddRoleCommandHandler,
  UserChangeRoleCommandHandler,
];
