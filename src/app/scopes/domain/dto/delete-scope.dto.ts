import { IsUUID, Matches } from 'class-validator';
import { SCOPE_ID } from '../../../../shared/helpers/regex';

export class DeleteScopeDto {
  @Matches(SCOPE_ID)
  _id: string;

  @IsUUID(4)
  _key: string;
}
