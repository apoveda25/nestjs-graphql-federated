import { UserCreateCommandHandler } from './user-create.handler';
import { UsersUpdateCommandHandler } from './users-update.handler';

export const UsersCommandHandlers = [
  UserCreateCommandHandler,
  UsersUpdateCommandHandler,
];
