import { IsInt, Matches } from 'class-validator';
import { ROLE_ID, USER_ID } from '../../../../shared/helpers/regex';

export class ChangeRoleUserDto {
  @Matches(USER_ID)
  _from: string;

  @Matches(ROLE_ID)
  _to: string;

  @Matches(USER_ID)
  updatedBy: string;

  @IsInt()
  updatedAt: number;
}
