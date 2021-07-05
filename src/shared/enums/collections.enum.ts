import { registerEnumType } from '@nestjs/graphql';

export enum collectionsEnum {
  USERS = 'Users',
  USERS_HAS_ROLE = 'UsersHasRole',
  ROLES = 'Roles',
  ROLES_HAS_SCOPE = 'RolesHasScope',
  SCOPES = 'Scopes',
}

registerEnumType(collectionsEnum, {
  name: 'collectionsEnum',
});
