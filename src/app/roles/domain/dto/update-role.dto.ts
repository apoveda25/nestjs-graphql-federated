import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ROLE_ID, USER_ID } from '../../../../shared/helpers/regex';

export class UpdateRoleDto {
  @Matches(ROLE_ID)
  _id: string;

  @IsUUID(4)
  _key: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @Max(9)
  @Min(1)
  @IsInt()
  @IsOptional()
  level?: number;

  @IsBoolean()
  @IsOptional()
  default?: boolean;

  @Matches(USER_ID)
  updatedBy: string;

  @IsNumber()
  updatedAt: number;
}
