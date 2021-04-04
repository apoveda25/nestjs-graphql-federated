import { RoleCreateCommandHandler } from './role-create.handler';
import { RolesDeleteCommandHandlers } from './roles-delete.handlers';
import { RolesUpdateCommandHandlers } from './roles-update.handlers';

export const RolesCommandHandlers = [
  RoleCreateCommandHandler,
  RolesUpdateCommandHandlers,
  RolesDeleteCommandHandlers,
];
