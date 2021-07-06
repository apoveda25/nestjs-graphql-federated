import { RoleFindQueryHandler } from './role-find.handler';
import { RolesCountQueryHandler } from './roles-count.handler';
import { RoleHasScopeFindQueryHandler } from './roles-has-scope/role-has-scope-find.handler';
import { RoleHasScopeInboundQueryHandler } from './roles-has-scope/role-has-scope-inbound.handler';
import { RoleHasScopeOutboundQueryHandler } from './roles-has-scope/role-has-scope-outbound.handler';
import { RolesSearchQueryHandler } from './roles-search.handler';

export const RolesQueryHandlers = [
  RoleFindQueryHandler,
  RolesSearchQueryHandler,
  RolesCountQueryHandler,
  RoleHasScopeFindQueryHandler,
  RoleHasScopeInboundQueryHandler,
  RoleHasScopeOutboundQueryHandler,
];
