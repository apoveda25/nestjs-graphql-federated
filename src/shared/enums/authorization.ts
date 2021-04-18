export enum AuthorizationEnum {
  usersCreate = 'users_create',
  usersUpdate = 'users_update',
  usersDelete = 'users_delete',
  usersFind = 'users_find',
  usersSearch = 'users_search',
  usersCount = 'users_count',

  usersHasRoleAdd = 'users_has_role_add',
  usersHasRoleChange = 'users_has_role_change',
  usersHasRoleRemove = 'users_has_role_remove',
  usersHasRoleRead = 'users_has_role_read',

  rolesCreate = 'roles_create',
  rolesUpdate = 'roles_update',
  rolesDelete = 'roles_delete',
  rolesFind = 'roles_find',
  rolesSearch = 'roles_search',
  rolesCount = 'roles_count',

  rolesHasScopeAdd = 'roles_has_scope_add',
  rolesHasScopeChange = 'roles_has_scope_change',
  rolesHasScopeRemove = 'roles_has_scope_remove',
  rolesHasScopeRead = 'roles_has_scope_read',

  scopesCreate = 'scopes_create',
  scopesUpdate = 'scopes_update',
  scopesDelete = 'scopes_delete',
  scopesFind = 'scopes_find',
  scopesSearch = 'scopes_search',
  scopesCount = 'scopes_count',
}
