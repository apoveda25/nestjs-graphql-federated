import { RoleCreatedEventHandler } from './role-created.handler';
import { RolesDeletedEventHandlers } from './roles-deleted.handlers';
import { RolesHasScopeCreatedEventHandler } from './roles-has-scope/roles-has-scope-created.handler';
import { RolesHasScopeDeletedEventHandler } from './roles-has-scope/roles-has-scope-deleted.handler';
import { RolesUpdatedEventHandlers } from './roles-updated.handlers';

export const RolesEventHandlers = [
  RoleCreatedEventHandler,
  RolesUpdatedEventHandlers,
  RolesDeletedEventHandlers,
  RolesHasScopeCreatedEventHandler,
  RolesHasScopeDeletedEventHandler,
];
