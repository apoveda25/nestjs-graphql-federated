import { UserCreatedEventHandler } from './user-created.handler';
import { UserHasRoleCreatedEventHandler } from './users-has-role/user-has-role-created.handler';
import { UserHasRoleUpdatedEventHandler } from './users-has-role/user-has-role-updated.handler';
import { UsersUpdatedEventHandler } from './users-updated.handler';

export const UsersEventHandlers = [
  UserCreatedEventHandler,
  UsersUpdatedEventHandler,
  UserHasRoleCreatedEventHandler,
  UserHasRoleUpdatedEventHandler,
];
