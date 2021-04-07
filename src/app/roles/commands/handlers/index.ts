import { RoleAddScopesCommandHandler } from './role-add-scopes.handler';
import { RoleCreateCommandHandler } from './role-create.handler';
import { RoleRemoveScopesCommandHandler } from './role-remove-scopes.handler';
import { RolesDeleteCommandHandlers } from './roles-delete.handlers';
import { RolesUpdateCommandHandlers } from './roles-update.handlers';

export const RolesCommandHandlers = [
  RoleCreateCommandHandler,
  RolesUpdateCommandHandlers,
  RolesDeleteCommandHandlers,
  RoleAddScopesCommandHandler,
  RoleRemoveScopesCommandHandler,
];
