import { UserCreatedEventHandler } from './user-created.handler';
import { UsersUpdatedEventHandler } from './users-updated.handler';

export const UsersEventHandlers = [
  UserCreatedEventHandler,
  UsersUpdatedEventHandler,
];
