import { UserFindQueryHandler } from './user-find.handler';
import { UserHasRoleSearchOutQueryHandler } from './user-has-role-search-out.handler';
import { UsersCountQueryHandler } from './users-count.handler';
import { UsersSearchQueryHandler } from './users-search.handler';

export const UsersQueryHandlers = [
  UserFindQueryHandler,
  UsersSearchQueryHandler,
  UsersCountQueryHandler,
  UserHasRoleSearchOutQueryHandler,
];
