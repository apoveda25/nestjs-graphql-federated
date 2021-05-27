import { IEdge } from '../../../../shared/interfaces/edge.interface';
import { Role } from '../entities/role.entity';

export interface IRole {
  _id?: string;
  _key?: string;
  name?: string;
  description?: string;
  active?: boolean;
  level?: number;
  default?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

export interface IRoleCreateConflits {
  conflictKeyName: Role;
}

export interface IRoleUpdateConflits {
  conflictKey: Role;
  conflictName: Role;
  conflictDefault: Role;
}

export interface IRoleDeleteConflits {
  conflictKey: Role;
  conflictEdgeOut: IEdge[];
  conflictEdgeIn: IEdge[];
}
