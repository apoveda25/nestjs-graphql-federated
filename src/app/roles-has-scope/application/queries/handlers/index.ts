import { RoleHasScopeFindAndQueryHandler } from './role-has-scope-find.handler';
import { RoleHasScopeInQueryHandler } from './role-has-scope-in.handler';
import { RoleHasScopeOutQueryHandler } from './role-has-scope-out.handler';

export const RolesHasScopeQueryHandlers = [
  RoleHasScopeOutQueryHandler,
  RoleHasScopeInQueryHandler,
  RoleHasScopeFindAndQueryHandler,
];
