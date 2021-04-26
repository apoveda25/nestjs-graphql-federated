import { Role } from '../../../roles/domain/entities/role.entity';
import { User } from '../../../users/domain/entities/user.entity';

export interface IAuthLoginConflicts {
  conflictUsernameEmail: User;
  conflictRole: Role;
}
