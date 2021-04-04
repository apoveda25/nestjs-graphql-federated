import { IEdge } from '../../../shared/interfaces/edge.interface';
import { Role } from '../entities/role.entity';

export interface IRole {
  _id?: string;
  _key?: string;
  name?: string;
  description?: string;
  active?: boolean;
  default?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

export interface IRoleUpdateConflits {
  withKey: Role;
  withName: Role;
  withDefault: Role;
}

export interface IRoleDeleteConflits {
  withKey: Role;
  withEdges: IEdge[];
}
