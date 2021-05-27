import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ROLE_ID, USER_ID } from '../../../../shared/helpers/regex';

export class CreateRoleDto {
  @Matches(ROLE_ID)
  _id: string;

  @IsUUID(4)
  _key: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  active: boolean;

  @Max(9)
  @Min(1)
  @IsInt()
  level: number;

  @IsBoolean()
  default: boolean;

  @Matches(USER_ID)
  createdBy: string;

  @IsString()
  updatedBy: string;

  @IsInt()
  createdAt: number;

  @IsOptional()
  @IsInt()
  updatedAt: number;
}
