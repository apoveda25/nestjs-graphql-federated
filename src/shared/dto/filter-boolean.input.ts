import { Injectable } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum } from 'class-validator';
import { MatchModeBoolean } from '../enums/match-mode-boolean.enum';
import { Operators } from '../enums/operators.enum';

@Injectable()
@InputType()
export class FilterBooleanInput {
  @IsBoolean()
  @Field(() => Boolean)
  value: boolean;

  @IsEnum(MatchModeBoolean)
  @Field(() => MatchModeBoolean)
  matchMode: string;

  @IsEnum(Operators)
  @Field(() => Operators)
  operator: string;
}
