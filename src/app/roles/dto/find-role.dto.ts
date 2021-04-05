import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ROLE_ID } from '../../../shared/helpers/regex';

export class FindRoleDto {
  @Matches(ROLE_ID)
  @IsOptional()
  _id?: string;

  @IsUUID(4)
  @IsOptional()
  _key?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsBoolean()
  @IsOptional()
  default?: boolean;
}
