import { UserFindQueryHandler } from './user-find.handler';
import { UsersCountQueryHandler } from './users-count.handler';
import { UserHasRoleFindQueryHandler } from './users-has-role/user-has-role-find.handler';
import { UsersHasRoleInboundQueryHandler } from './users-has-role/users-has-role-inbound.handler';
import { UsersHasRoleOutboundQueryHandler } from './users-has-role/users-has-role-outbound.handler';
import { UsersSearchQueryHandler } from './users-search.handler';

export const UsersQueryHandlers = [
  UserFindQueryHandler,
  UsersSearchQueryHandler,
  UsersCountQueryHandler,
  UserHasRoleFindQueryHandler,
  UsersHasRoleInboundQueryHandler,
  UsersHasRoleOutboundQueryHandler,
];
