import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ROLE_ID } from '../../../shared/helpers/regex';

@InputType()
export class CreateRoleDto {
  @Matches(ROLE_ID)
  @Field(() => ID, {
    description: 'Example field (Roles/20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  _id: string;

  @IsUUID(4)
  _key: string;

  @IsString()
  @Field(() => String, {
    description: 'Example field (name)',
  })
  name: string;

  @IsString()
  @Field(() => String, {
    description: 'Example field (description)',
    nullable: true,
    defaultValue: '',
  })
  description: string;

  @IsBoolean()
  @Field(() => Boolean, {
    description: 'Example field (true)',
    nullable: true,
    defaultValue: true,
  })
  active: boolean;

  @IsBoolean()
  default: boolean;

  @Matches(ROLE_ID)
  createdBy: string;

  @IsString()
  updatedBy: string;

  @IsNumber()
  createdAt: number;

  @IsNumber()
  updatedAt: number;
}
