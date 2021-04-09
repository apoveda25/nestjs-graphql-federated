import { ScopeFindQueryHandler } from './scope-find.handler';
import { ScopesCountQueryHandler } from './scopes-count.handler';
import { ScopesSearchQueryHandler } from './scopes-search.handler';

export const ScopesQueryHandlers = [
  ScopeFindQueryHandler,
  ScopesCountQueryHandler,
  ScopesSearchQueryHandler,
];
