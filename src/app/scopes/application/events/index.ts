import { ScopesCreatedEventHandler } from './scopes-created.handler';
import { ScopesDeletedEventHandler } from './scopes-deleted.handler';

export const ScopesEventHandlers = [
  ScopesCreatedEventHandler,
  ScopesDeletedEventHandler,
];
