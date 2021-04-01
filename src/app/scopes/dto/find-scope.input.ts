import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsUUID, Matches } from 'class-validator';
import { SCOPE_ID } from '../../../shared/helpers/regex';
import { ScopeAction } from './action.enum';

@InputType()
export class FindScopeInput {
  @Matches(SCOPE_ID)
  @IsOptional()
  @Field(() => ID, {
    nullable: true,
    description: `Example field (Scopes/20f736ce-b6a0-4ed5-8062-47d32c844d3d)`,
  })
  _id?: string;

  @IsUUID(4)
  @IsOptional()
  @Field(() => ID, {
    nullable: true,
    description: `Example field (20f736ce-b6a0-4ed5-8062-47d32c844d3d)`,
  })
  _key?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: `Example field (scopes_find)`,
  })
  name?: string;

  @IsEnum(ScopeAction)
  @IsOptional()
  @Field(() => ScopeAction, {
    nullable: true,
    description: `Example field (CREATE | UPDATE | DELETE | FIND | SEARCH | COUNT)`,
  })
  action?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: `Example field (Scopes)`,
  })
  collection?: string;
}
