import { Injectable } from '@nestjs/common';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt } from 'class-validator';
import { MatchModeNumber } from '../enums/match-mode-number.enum';
import { Operators } from '../enums/operators.enum';

@Injectable()
@InputType()
export class FilterIntInput {
  @IsInt()
  @Field(() => Int)
  value: number;

  @IsEnum(MatchModeNumber)
  @Field(() => MatchModeNumber)
  matchMode: string;

  @IsEnum(Operators)
  @Field(() => Operators)
  operator: string;
}
