import { UserAddedRoleEventHandler } from './user-added-role.handler';
import { UserChangedRoleEventHandler } from './user-changed-role.handler';

export const UsersHasRoleEventHandlers = [
  UserAddedRoleEventHandler,
  UserChangedRoleEventHandler,
];
