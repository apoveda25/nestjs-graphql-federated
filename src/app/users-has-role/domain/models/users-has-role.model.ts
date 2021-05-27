import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { IContextUser } from '../../../../shared/interfaces/context-graphql.interface';
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
    context: IContextUser,
  ): Promise<ChangeRoleUserDto> {
    if (this.isNotUserExist(conflictFrom)) throw new GraphQLError('Not Found');

    if (this.isNotRoleExist(conflictTo)) throw new GraphQLError('Not Found');

    if (this.isNotEdgeExist(conflictEdge)) throw new GraphQLError('Not Found');

    if (this.isLevelRoleAssignedLessEqualRoleUserCurrent(conflictTo, context))
      throw new GraphQLError('Bad Request');

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

  private isLevelRoleAssignedLessEqualRoleUserCurrent(
    role: Role,
    context: IContextUser,
  ): boolean {
    return role.level <= context.role.level;
  }
}
