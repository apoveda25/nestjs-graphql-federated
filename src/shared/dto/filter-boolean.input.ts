import { Injectable } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum } from 'class-validator';
import { ComparisonOperatorBoolean } from '../enums/comparison-operator-boolean.enum';

@Injectable()
@InputType()
export class FilterBooleanInput {
  @IsBoolean()
  @Field(() => Boolean)
  value: boolean;

  @IsEnum(ComparisonOperatorBoolean)
  @Field(() => ComparisonOperatorBoolean)
  operator: string;
}
