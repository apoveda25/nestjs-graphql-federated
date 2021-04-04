import { RoleCreateCommandHandler } from './role-create.handler';
import { RolesUpdateCommandHandlers } from './roles-update.handlers';

export const RolesCommandHandlers = [
  RoleCreateCommandHandler,
  RolesUpdateCommandHandlers,
];
