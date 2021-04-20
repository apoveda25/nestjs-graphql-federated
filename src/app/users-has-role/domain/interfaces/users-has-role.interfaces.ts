import { IEdge } from '../../../../shared/interfaces/edge.interface';
import { Role } from '../../../roles/domain/entities/role.entity';
import { User } from '../../../users/domain/entities/user.entity';
// export interface IRole {
//   _id?: string;
//   _key?: string;
//   name?: string;
//   description?: string;
//   active?: boolean;
//   default?: boolean;
//   createdBy?: string;
//   updatedBy?: string;
// }

export interface IUserHasRoleUpdateConflits {
  conflictFrom: User;
  conflictTo: Role;
  conflictEdge: IEdge;
}

// export interface IRoleDeleteConflits {
//   withKey: Role;
//   withEdges: IEdge[];
// }

// export interface IRoleAddScopesConflicts {
//   withFrom: Role;
//   withTo: Scope;
// }

// export interface IRoleRemoveScopesConflicts {
//   withFromTo: Edge;
// }
