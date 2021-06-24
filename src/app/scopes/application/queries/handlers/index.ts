import { ScopeFindQueryHandler } from './scope-find.handler';
import { ScopesCountQueryHandler } from './scopes-count.handler';
import { ScopesSearchFilterByRoleQueryHandler } from './scopes-search-filter-by-role.handler';
import { ScopesSearchQueryHandler } from './scopes-search.handler';

export const ScopesQueryHandlers = [
  ScopeFindQueryHandler,
  ScopesCountQueryHandler,
  ScopesSearchQueryHandler,
  ScopesSearchFilterByRoleQueryHandler,
];
