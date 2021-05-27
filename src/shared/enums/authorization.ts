export enum AuthorizationEnum {
  usersCreate = 'users_create',
  usersUpdate = 'users_update',
  usersDelete = 'users_delete',
  usersFind = 'users_find',
  usersSearch = 'users_search',
  usersCount = 'users_count',

  usersHasRoleAdd = 'usershasrole_add',
  usersHasRoleChange = 'usershasrole_change',
  usersHasRoleRemove = 'usershasrole_remove',
  usersHasRoleRead = 'usershasrole_read',

  rolesCreate = 'roles_create',
  rolesUpdate = 'roles_update',
  rolesDelete = 'roles_delete',
  rolesFind = 'roles_find',
  rolesSearch = 'roles_search',
  rolesCount = 'roles_count',

  rolesHasScopeAdd = 'roleshasscope_add',
  rolesHasScopeChange = 'roleshasscope_change',
  rolesHasScopeRemove = 'roleshasscope_remove',
  rolesHasScopeRead = 'roleshasscope_read',

  scopesCreate = 'scopes_create',
  scopesUpdate = 'scopes_update',
  scopesDelete = 'scopes_delete',
  scopesFind = 'scopes_find',
  scopesSearch = 'scopes_search',
  scopesCount = 'scopes_count',
}
