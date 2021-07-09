import { Role } from '../../../roles/domain/entities/role.entity';
import { User } from '../entities/user.entity';

export interface IUserCreateConflits {
  conflictKeyUsernameEmail: User;
  conflictRoleId: Role;
}

export interface IUserUpdateConflits {
  conflictKey: User;
  conflictUsername: User;
  conflictEmail: User;
}
