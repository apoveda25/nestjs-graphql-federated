import { UserHasRoleInQueryHandler } from './user-has-role-in.handler';
import { UserHasRoleOutQueryHandler } from './user-has-role-out.handler';

export const UsersHasRoleQueryHandlers = [
  UserHasRoleOutQueryHandler,
  UserHasRoleInQueryHandler,
];
