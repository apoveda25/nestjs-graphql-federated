export const WORD = /^[a-zA-Z]+[\w]*$/;
<<<<<<< HEAD
export const PASSWORD = /^[\w.!@#$%^&*_+='",:;|<>]{12,20}$/;
export const USER_ID = /^Users[/][0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
export const ROLE_ID = /^Roles[/][0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
export const SCOPE_ID = /^Scopes[/][0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
=======
export const PASSWORD = /^[\w.!@#$%^&*_+='",:;|<>]{8,20}$/;
export const USER_ID = /^Users\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89AB][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/;
export const ROLE_ID = /^Roles\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89AB][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/;
export const SCOPE_ID = /^Scopes\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89AB][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/;
>>>>>>> parent of e706196... Merge branch 'release/v0.2.0'
