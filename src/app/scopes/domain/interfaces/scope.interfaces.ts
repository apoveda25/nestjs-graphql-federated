import { Role } from '../../../roles/domain/entities/role.entity';
import { Scope } from '../entities/scope.entity';
export interface IScope {
  _id?: string;
  _key?: string;
  name?: string;
  action?: string;
  collection?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface IScopeCreateConflits {
  conflictKeyName: Scope;
}

export interface IScopeDeleteConflits {
  conflictKey: Scope;
  conflictInEdgesRoles: Role[];
}

export interface ICollection extends Record<string, any> {
  name: string;
}
