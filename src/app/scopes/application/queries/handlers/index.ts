import { ScopeFindQueryHandler } from './scope-find.handler';
import { ScopesCountQueryHandler } from './scopes-count.handler';
import { ScopesSearchRolesHasScopeQueryHandler } from './scopes-search-roles-has-scope.handler';
import { ScopesSearchQueryHandler } from './scopes-search.handler';

export const ScopesQueryHandlers = [
  ScopeFindQueryHandler,
  ScopesCountQueryHandler,
  ScopesSearchQueryHandler,
  ScopesSearchRolesHasScopeQueryHandler,
];
