import { Injectable } from '@nestjs/common';
import { Field, GraphQLTimestamp, InputType } from '@nestjs/graphql';
import { IsEnum, IsInt } from 'class-validator';
import { MatchModeDatetime } from '../enums/match-mode-datetime.enum';
import { Operators } from '../enums/operators.enum';

@Injectable()
@InputType()
export class FilterDatetimeInput {
  @IsInt()
  @Field(() => GraphQLTimestamp)
  value: number;

  @IsEnum(MatchModeDatetime)
  @Field(() => MatchModeDatetime)
  matchMode: string;

  @IsEnum(Operators)
  @Field(() => Operators)
  operator: string;
}
