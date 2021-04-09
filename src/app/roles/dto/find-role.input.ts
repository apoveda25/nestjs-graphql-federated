import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ROLE_ID } from '../../../shared/helpers/regex';

@InputType()
export class FindRoleInput {
  @Matches(ROLE_ID)
  @IsOptional()
  @Field(() => ID, {
    description: 'Example field (Roles/20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
    nullable: true,
  })
  _id?: string;

  @IsUUID(4)
  @IsOptional()
  @Field(() => ID, {
    description: 'Example field (20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
    nullable: true,
  })
  _key?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, {
    description: 'Example field (name)',
    nullable: true,
  })
  name?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, {
    description: 'Example field (description)',
    nullable: true,
  })
  description?: string;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    description: 'Example field (true)',
    nullable: true,
  })
  active?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    description: 'Example field (true)',
    nullable: true,
  })
  default?: boolean;
}
