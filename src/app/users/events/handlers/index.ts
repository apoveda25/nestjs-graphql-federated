import { UserAddedRoleEventHandler } from './user-added-role.handler';
import { UserCreatedEventHandler } from './user-created.handler';
import { UsersUpdatedEventHandler } from './users-updated.handler';

export const UsersEventHandlers = [
  UserCreatedEventHandler,
  UserAddedRoleEventHandler,
  UsersUpdatedEventHandler,
];
