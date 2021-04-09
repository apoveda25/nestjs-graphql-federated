import {
  IsBoolean,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ROLE_ID, USER_ID } from '../../../shared/helpers/regex';

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

  @IsBoolean()
  default: boolean;

  @Matches(USER_ID)
  createdBy: string;

  @IsString()
  updatedBy: string;

  @IsNumber()
  createdAt: number;

  @IsNumber()
  updatedAt: number;
}
