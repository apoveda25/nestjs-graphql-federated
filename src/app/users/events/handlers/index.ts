import { UserAddedRoleEventHandler } from './user-added-role.handler';
import { UserCreatedEventHandler } from './user-created.handler';

export const UsersEventHandlers = [
  UserCreatedEventHandler,
  UserAddedRoleEventHandler,
];
