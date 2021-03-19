import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { PASSWORD, USER_ID, WORD } from '../../../shared/helpers/regex';
import { Gender } from './gender.enum';

@InputType()
export class CreateUserDto {
  @Matches(USER_ID)
  @Field(() => ID, {
    description: 'Example field (Users/20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  _id: string;

  @IsUUID(4)
  _key: string;

  @Matches(WORD)
  @Field(() => String, {
    description: 'Example field (username)',
  })
  username: string;

  @IsEmail()
  @Field(() => String, {
    description: 'Example field (email@email.com)',
  })
  email: string;

  @Matches(PASSWORD)
  @IsString()
  @Field(() => String, {
    description: 'Example field (secret123)',
  })
  password: string;

  @IsString()
  @Field(() => String, {
    description: 'Example field (name)',
    nullable: true,
    defaultValue: '',
  })
  name?: string;

  @IsString()
  @Field(() => String, {
    description: 'Example field (surname)',
    nullable: true,
    defaultValue: '',
  })
  surname?: string;

  @IsBoolean()
  active: boolean;

  @IsBoolean()
  emailActive: boolean;

  @IsString()
  emailCode: string;

  @IsNumber()
  emailCodeExpire: number;

  @IsNumber()
  @Field(() => Number, {
    description: `Example field (${Date.now()})`,
    nullable: true,
    defaultValue: 0,
  })
  birthday: number;

  @IsEnum(Gender)
  @Field(() => Gender, {
    description: `Example field (MALE | FEMALE | UNDEFINED)`,
    nullable: true,
    defaultValue: 'UNDEFINED',
  })
  gender: string;

  @Matches(USER_ID)
  createdBy: string;

  @IsString()
  updatedBy: string;

  @IsNumber()
  createdAt: number;

  @IsNumber()
  updatedAt: number;
}
