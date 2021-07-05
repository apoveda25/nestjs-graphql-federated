import { RoleHasScopeInQueryHandler } from './roles-has-scope/role-has-scope-in.handler';
import { ScopeFindQueryHandler } from './scope-find.handler';
import { ScopesCountQueryHandler } from './scopes-count.handler';
import { ScopesSearchDontBelongRoleQueryHandler } from './scopes-search-dont-belong-role.handler';
import { ScopesSearchQueryHandler } from './scopes-search.handler';

export const ScopesQueryHandlers = [
  ScopeFindQueryHandler,
  ScopesCountQueryHandler,
  ScopesSearchQueryHandler,
  ScopesSearchDontBelongRoleQueryHandler,
  RoleHasScopeInQueryHandler,
];
