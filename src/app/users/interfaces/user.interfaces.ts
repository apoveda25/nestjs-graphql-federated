import { Role } from '../../roles/entities/role.entity';
import { User } from '../entities/user.entity';

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

export interface IUserCreateConflits {
  withKey: User;
  withUsernameEmail: User;
  withRoleId: Role;
}

// export interface IRoleUpdateConflits {
//   withKey: Role;
//   withName: Role;
//   withDefault: Role;
// }

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
