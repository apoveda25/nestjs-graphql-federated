import { InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import {
  PASSWORD,
  ROLE_ID,
  USER_ID,
  WORD,
} from '../../../../shared/helpers/regex';
import { usersGenderEnum } from '../enums/users.enum';

@InputType()
export class CreateUserDto {
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

  @IsInt()
  emailCodeExpire: number;

  @IsOptional()
  @IsInt()
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

  @Matches(ROLE_ID)
  roleId: string;
}
