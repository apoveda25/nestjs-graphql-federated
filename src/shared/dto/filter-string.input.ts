import { Injectable } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { MatchModeString } from '../enums/match-mode-string.enum';
import { Operators } from '../enums/operators.enum';

@Injectable()
@InputType()
export class FilterStringInput {
  @IsString()
  @Field(() => String)
  value: string;

  @IsEnum(MatchModeString)
  @Field(() => MatchModeString)
  matchMode: string;

  @IsEnum(Operators)
  @Field(() => Operators)
  operator: string;
}
