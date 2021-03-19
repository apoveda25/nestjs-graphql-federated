import { Injectable } from '@nestjs/common';
import { Field, Float, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumber } from 'class-validator';
import { ComparisonOperatorNumber } from '../enums/comparison-operator-number.enum';

@Injectable()
@InputType()
export class FilterFloatInput {
  @IsNumber()
  @Field(() => Float)
  value: number;

  @IsEnum(ComparisonOperatorNumber)
  @Field(() => ComparisonOperatorNumber)
  operator: string;
}
