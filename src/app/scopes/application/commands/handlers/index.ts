import { ScopesCreateCommandHandler } from './scopes-create.handler';
import { ScopesDeleteCommandHandler } from './scopes-delete.handler';
import { ScopesInitCommandHandler } from './scopes-init.handler';

export const ScopesCommandHandlers = [
  ScopesInitCommandHandler,
  ScopesCreateCommandHandler,
  ScopesDeleteCommandHandler,
];
