import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { RoleFindQuery } from 'src/app/roles/queries/impl/role-find.query';
import { UserFindQuery } from 'src/app/users/queries/impl/user-find.query';
import { Role } from '../../roles/entities/role.entity';
import { User } from '../../users/entities/user.entity';
import { ChangeRoleUserDto } from '../dto/change-role-user.dto';
import { UserHasRoleOutEdgeQuery } from '../queries/impl/user-has-role-out-edge.query';

@Injectable()
export class UsersHasRoleModel {
  constructor(private readonly queryBus: QueryBus) {}

  async update(
    changeRoleUserDto: ChangeRoleUserDto,
  ): Promise<ChangeRoleUserDto> {
    const conflictFrom = await this.queryBus.execute(
      new UserFindQuery({ _id: changeRoleUserDto._from }),
    );

    if (this.isNotUserExist(conflictFrom)) throw new NotFoundException();

    const conflictTo = await this.queryBus.execute(
      new RoleFindQuery({ _id: changeRoleUserDto._to }),
    );

    if (this.isNotRoleExist(conflictTo)) throw new NotFoundException();

    const edge = await this.queryBus.execute(
      new UserHasRoleOutEdgeQuery({ parentId: changeRoleUserDto._from }),
    );

    return { ...edge, ...changeRoleUserDto };
  }

  private isNotUserExist(user: User): boolean {
    return !user ? true : false;
  }

  private isNotRoleExist(role: Role): boolean {
    return !role ? true : false;
  }
}
