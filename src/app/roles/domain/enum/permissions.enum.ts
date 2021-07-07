export enum PermissionsEnum {
  rolesCreateOne = 'roles_create_one',
  rolesCreateAll = 'roles_create_all',
  rolesUpdateOne = 'roles_update_one',
  rolesUpdateAll = 'roles_update_all',
  rolesDeleteOne = 'roles_delete_one',
  rolesDeleteAll = 'roles_delete_all',

  rolesFind = 'roles_find',
  rolesSearch = 'roles_search',
  rolesCount = 'roles_count',

  rolesAddScopes = 'roles_add_scopes',
  rolesChangeScopes = 'roles_change_scopes',
  rolesRemoveScopes = 'roles_remove_scopes',

  rolesInUsers = 'roles_in_users',
  rolesOutScopes = 'roles_out_scopes',
  rolesOutScopesOrphans = 'roles_out_scopes_orphans',
}
