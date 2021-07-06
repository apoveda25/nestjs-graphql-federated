import { RoleCreateCommandHandler } from './role-create.handler';
import { RolesDeleteCommandHandlers } from './roles-delete.handlers';
import { RolesHasScopeCreateCommandHandler } from './roles-has-scope/roles-has-scope-create.handler';
import { RolesHasScopeDeleteCommandHandler } from './roles-has-scope/roles-has-scope-delete.handler';
import { RolesUpdateCommandHandlers } from './roles-update.handlers';

export const RolesCommandHandlers = [
  RoleCreateCommandHandler,
  RolesUpdateCommandHandlers,
  RolesDeleteCommandHandlers,
  RolesHasScopeCreateCommandHandler,
  RolesHasScopeDeleteCommandHandler,
];
