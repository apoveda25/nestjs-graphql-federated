import { InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import {
  PASSWORD,
  ROLE_ID,
  USER_ID,
  WORD,
} from '../../../shared/helpers/regex';
import { Gender } from './gender.enum';

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

  @IsNumber()
  emailCodeExpire: number;

  @IsNumber()
  birthday: number;

  @IsEnum(Gender)
  gender: string;

  @IsString()
  prefix: string;

  @IsString()
  urlImage: string;

  @Matches(USER_ID)
  createdBy: string;

  @IsString()
  updatedBy: string;

  @IsNumber()
  createdAt: number;

  @IsNumber()
  updatedAt: number;

  @Matches(ROLE_ID)
  roleId: string;
}
