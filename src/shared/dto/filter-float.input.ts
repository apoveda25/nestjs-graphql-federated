import { Injectable } from '@nestjs/common';
import { Field, Float, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumber } from 'class-validator';
import { MatchModeNumber } from '../enums/match-mode-number.enum';
import { Operators } from '../enums/operators.enum';

@Injectable()
@InputType()
export class FilterFloatInput {
  @IsNumber()
  @Field(() => Float)
  value: number;

  @IsEnum(MatchModeNumber)
  @Field(() => MatchModeNumber)
  matchMode: string;

  @IsEnum(Operators)
  @Field(() => Operators)
  operator: string;
}
