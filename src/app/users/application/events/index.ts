import { UserCreatedEventHandler } from './user-created.handler';
import { UsersHasRoleCreatedEventHandler } from './users-has-role/users-has-role-created.handler';
import { UsersHasRoleUpdatedEventHandler } from './users-has-role/users-has-role-updated.handler';
import { UsersUpdatedEventHandler } from './users-updated.handler';

export const UsersEventHandlers = [
  UserCreatedEventHandler,
  UsersUpdatedEventHandler,
  UsersHasRoleCreatedEventHandler,
  UsersHasRoleUpdatedEventHandler,
];
