import { registerEnumType } from '@nestjs/graphql';

export enum SCOPES_ACTIONS_ENUM {
  SEARCH = 'SEARCH',
  COUNT = 'COUNT',
  FIND = 'FIND',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

registerEnumType(SCOPES_ACTIONS_ENUM, {
  name: 'scopesActionsEnum',
});

export enum COLLECTIONS_ENUM {
  USERS = 'Users',
  USERS_HAS_ROLE = 'UsersHasRole',
  ROLES = 'Roles',
  ROLES_HAS_SCOPE = 'RolesHasScope',
  SCOPES = 'Scopes',
}

registerEnumType(COLLECTIONS_ENUM, {
  name: 'collectionsEnum',
});
