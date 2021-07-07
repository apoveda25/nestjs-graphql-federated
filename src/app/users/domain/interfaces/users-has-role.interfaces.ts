import { IEdge } from '../../../../shared/interfaces/edge.interface';
import { Role } from '../../../roles/domain/entities/role.entity';
import { User } from '../../../users/domain/entities/user.entity';

export interface IUserHasRoleUpdateConflits {
  conflictFrom: User;
  conflictTo: Role;
  conflictEdge: IEdge;
}
