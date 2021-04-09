import { Matches } from 'class-validator';
import { ROLE_ID, SCOPE_ID } from '../../../shared/helpers/regex';

export class RemoveScopesRoleDto {
  @Matches(ROLE_ID)
  _from: string;

  @Matches(SCOPE_ID)
  _to: string;
}
