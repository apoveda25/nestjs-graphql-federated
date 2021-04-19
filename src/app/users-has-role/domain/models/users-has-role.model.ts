import { Injectable, NotFoundException } from '@nestjs/common';
import { IEdge } from '../../../../shared/interfaces/edge.interface';
import { Role } from '../../../roles/domain/entities/role.entity';
import { User } from '../../../users/domain/entities/user.entity';
import { ChangeRoleUserDto } from '../dto/change-role-user.dto';
import { IUserHasRoleUpdateConflits } from '../interfaces/users-has-role.interfaces';

@Injectable()
export class UsersHasRoleModel {
  async update(
    userHasRole: ChangeRoleUserDto,
    { conflictFrom, conflictTo, conflictEdge }: IUserHasRoleUpdateConflits,
  ): Promise<ChangeRoleUserDto> {
    if (this.isNotUserExist(conflictFrom)) throw new NotFoundException();

    if (this.isNotRoleExist(conflictTo)) throw new NotFoundException();

    if (this.isNotEdgeExist(conflictEdge)) throw new NotFoundException();

    return { ...conflictEdge, ...userHasRole };
  }

  private isNotUserExist(user: User): boolean {
    return !user ? true : false;
  }

  private isNotRoleExist(role: Role): boolean {
    return !role ? true : false;
  }

  private isNotEdgeExist(edge: IEdge): boolean {
    return !edge ? true : false;
  }
}
