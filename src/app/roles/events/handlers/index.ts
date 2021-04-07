import { RoleAddedScopesEventHandler } from './role-added-scopes.handler';
import { RoleCreatedEventHandler } from './role-created.handler';
import { RoleRemovedScopesEventHandler } from './role-removed-scopes.handler';
import { RolesDeletedEventHandlers } from './roles-deleted.handlers';
import { RolesUpdatedEventHandlers } from './roles-updated.handlers';

export const RolesEventHandlers = [
  RoleCreatedEventHandler,
  RolesUpdatedEventHandlers,
  RolesDeletedEventHandlers,
  RoleAddedScopesEventHandler,
  RoleRemovedScopesEventHandler,
];
