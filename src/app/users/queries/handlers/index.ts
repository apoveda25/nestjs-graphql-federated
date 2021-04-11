import { UserFindQueryHandler } from './user-find.handler';
import { UsersCountQueryHandler } from './users-count.handler';
import { UsersSearchQueryHandler } from './users-search.handler';

export const UsersQueryHandlers = [
  UserFindQueryHandler,
  UsersSearchQueryHandler,
  UsersCountQueryHandler,
];
