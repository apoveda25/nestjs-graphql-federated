import { Injectable } from '@nestjs/common';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt } from 'class-validator';
import { ComparisonOperatorNumber } from '../enums/comparison-operator-number.enum';

@Injectable()
@InputType()
export class FilterIntInput {
  @IsInt()
  @Field(() => Int)
  value: number;

  @IsEnum(ComparisonOperatorNumber)
  @Field(() => ComparisonOperatorNumber)
  operator: string;
}
