import { Injectable } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum } from 'class-validator';
import { MatchModeDatetime } from '../enums/match-mode-datetime.enum';
import { Operators } from '../enums/operators.enum';

@Injectable()
@InputType()
export class FilterDatetimeInput {
  @IsDate()
  @Field(() => Number)
  value: number;

  @IsEnum(MatchModeDatetime)
  @Field(() => MatchModeDatetime)
  matchMode: string;

  @IsEnum(Operators)
  @Field(() => Operators)
  operator: string;
}
