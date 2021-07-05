import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { SCOPE_ID, USER_ID } from '../../../../shared/helpers/regex';

export class CreateScopeDto {
  @Matches(SCOPE_ID)
  _id: string;

  @IsUUID(4)
  _key: string;

  @IsString()
  name: string;

  @IsString()
  action: string;

  @IsString()
  collection: string;

  @Matches(USER_ID)
  createdBy: string;

  @IsOptional()
  updatedBy: null;

  @IsNumber()
  createdAt: number;

  @IsOptional()
  updatedAt: null;
}
