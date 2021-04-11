import { RoleFindQueryHandler } from './role-find.handler';
import { RoleHasScopeSearchOutQueryHandler } from './role-has-scope-search-out.handler';
import { RolesCountQueryHandler } from './roles-count.handler';
import { RolesSearchQueryHandler } from './roles-search.handler';
import { UserHasRoleSearchInQueryHandler } from './user-has-role-search-in.handler';

export const RolesQueryHandlers = [
  RoleFindQueryHandler,
  RolesSearchQueryHandler,
  RolesCountQueryHandler,
  RoleHasScopeSearchOutQueryHandler,
  UserHasRoleSearchInQueryHandler,
];
