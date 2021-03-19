import { Injectable } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum } from 'class-validator';
import { ComparisonOperatorDatetime } from '../enums/comparison-operator-datetime.enum';

@Injectable()
@InputType()
export class FilterDatetimeInput {
  @IsDate()
  @Field(() => Number)
  value: number;

  @IsEnum(ComparisonOperatorDatetime)
  @Field(() => ComparisonOperatorDatetime)
  operator: string;
}
