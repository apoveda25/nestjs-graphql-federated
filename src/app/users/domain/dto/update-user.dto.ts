import { InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
} from 'class-validator';
import { USER_ID, WORD } from '../../../../shared/helpers/regex';
import { usersGenderEnum } from '../enums/users.enum';

@InputType()
export class UpdateUserDto {
  @Matches(USER_ID)
  _id: string;

  @IsUUID(4)
  _key: string;

  @Matches(WORD)
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsInt()
  @IsOptional()
  birthday?: number;

  @IsEnum(usersGenderEnum)
  @IsOptional()
  gender?: string;

  @Matches(WORD)
  @IsOptional()
  prefix?: string;

  @IsUrl({ protocols: ['https'] })
  @IsOptional()
  urlImage?: string;

  @IsInt()
  updatedAt: number;

  @Matches(USER_ID)
  updatedBy: string;
}
