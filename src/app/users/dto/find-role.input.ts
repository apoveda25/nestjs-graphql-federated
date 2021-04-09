import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID, Matches } from 'class-validator';
import { USER_ID } from '../../../shared/helpers/regex';

@InputType()
export class FindUserInput {
  @Matches(USER_ID)
  @IsOptional()
  @Field(() => ID, {
    description: 'Example field (Users/20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
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
    description: 'Example field (username)',
    nullable: true,
  })
  username?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, {
    description: 'Example field (email@email.com)',
    nullable: true,
  })
  email?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, {
    description: 'Example field (name)',
    nullable: true,
  })
  name?: string;

  @Field(() => String, {
    description: 'Example field (surname)',
    nullable: true,
  })
  surname?: string;

  @Field(() => Boolean, {
    description: 'Example field (true)',
    nullable: true,
  })
  active?: boolean;

  @Field(() => Boolean, {
    description: 'Example field (true)',
    nullable: true,
  })
  emailActive?: boolean;

  @Field(() => Number, {
    description: `Example field (${Date.now()})`,
    nullable: true,
  })
  birthday?: number;

  @Field(() => String, {
    description: `Example field (MALE | FEMALE)`,
    nullable: true,
  })
  gender?: string;
}
