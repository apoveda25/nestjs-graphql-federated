import { RoleAddScopesCommandHandler } from './role-add-scopes.handler';
import { RoleRemoveScopesCommandHandler } from './role-remove-scopes.handler';

export const RolesHasScopeCommandHandlers = [
  RoleAddScopesCommandHandler,
  RoleRemoveScopesCommandHandler,
];
