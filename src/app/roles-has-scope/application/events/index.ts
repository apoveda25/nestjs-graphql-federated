import { RoleAddedScopesEventHandler } from './role-added-scopes.handler';
import { RoleRemovedScopesEventHandler } from './role-removed-scopes.handler';

export const RolesHasScopeEventHandlers = [
  RoleAddedScopesEventHandler,
  RoleRemovedScopesEventHandler,
];
