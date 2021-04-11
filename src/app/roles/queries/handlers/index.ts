import { RoleFindQueryHandler } from './role-find.handler';
import { RolesCountQueryHandler } from './roles-count.handler';
import { RolesSearchQueryHandler } from './roles-search.handler';

export const RolesQueryHandlers = [
  RoleFindQueryHandler,
  RolesSearchQueryHandler,
  RolesCountQueryHandler,
];
