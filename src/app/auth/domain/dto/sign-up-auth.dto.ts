import { InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { PASSWORD, USER_ID, WORD } from '../../../../shared/helpers/regex';
import { usersGenderEnum } from '../../../users/domain/enums/users.enum';

@InputType()
export class SignUpAuthDto {
  @Matches(USER_ID)
  _id: string;

  @IsUUID(4)
  _key: string;

  @Matches(WORD)
  username: string;

  @IsEmail()
  email: string;

  @Matches(PASSWORD)
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsBoolean()
  active: boolean;

  @IsBoolean()
  emailActive: boolean;

  @IsString()
  emailCode: string;

  @IsNumber()
  emailCodeExpire: number;

  @IsOptional()
  @IsNumber()
  birthday: number;

  @IsEnum(usersGenderEnum)
  gender: string;

  @IsString()
  prefix: string;

  @IsString()
  urlImage: string;

  @Matches(USER_ID)
  createdBy: string;

  @IsString()
  updatedBy: string;

  @IsInt()
  createdAt: number;

  @IsOptional()
  @IsInt()
  updatedAt: number;

  roleId?: string;
}
