import { ScopesCreateCommandHandler } from './scopes-create.handler';
import { ScopesInitCommandHandler } from './scopes-init.handler';

export const ScopesCommandHandlers = [
  ScopesInitCommandHandler,
  ScopesCreateCommandHandler,
];
