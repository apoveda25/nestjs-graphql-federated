import { RoleCreatedEventHandler } from './role-created.handler';
import { RolesUpdatedEventHandlers } from './roles-updated.handlers';

export const RolesEventHandlers = [
  RoleCreatedEventHandler,
  RolesUpdatedEventHandlers,
];
