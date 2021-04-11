import { RoleCreatedEventHandler } from './role-created.handler';
import { RolesDeletedEventHandlers } from './roles-deleted.handlers';
import { RolesUpdatedEventHandlers } from './roles-updated.handlers';

export const RolesEventHandlers = [
  RoleCreatedEventHandler,
  RolesUpdatedEventHandlers,
  RolesDeletedEventHandlers,
];
