import { IsNumber, Matches } from 'class-validator';
import { ROLE_ID, SCOPE_ID, USER_ID } from '../../../shared/helpers/regex';

export class AddScopesRoleDto {
  @Matches(ROLE_ID)
  _from: string;

  @Matches(SCOPE_ID)
  _to: string;

  @Matches(USER_ID)
  createdBy: string;

  @IsNumber()
  createdAt: number;
}
