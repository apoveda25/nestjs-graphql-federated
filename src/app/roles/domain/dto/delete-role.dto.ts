import { IsUUID, Matches } from 'class-validator';
import { ROLE_ID } from '../../../../shared/helpers/regex';

export class DeleteRoleDto {
  @Matches(ROLE_ID)
  _id: string;

  @IsUUID(4)
  _key: string;
}
