import { Injectable } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { ComparisonOperatorString } from '../enums/comparison-operator-string.enum';

@Injectable()
@InputType()
export class FilterStringInput {
  @IsString()
  @Field(() => String)
  value: string;

  @IsString()
  @Field(() => ComparisonOperatorString)
  operator: string;
}
