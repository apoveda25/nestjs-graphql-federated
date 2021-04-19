import { Role } from '../../../roles/domain/entities/role.entity';
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
  conflictKeyUsernameEmail: User;
  conflictRoleId: Role;
}

export interface IUserUpdateConflits {
  conflictKey: User;
  conflictUsername: User;
  conflictEmail: User;
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
