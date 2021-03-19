import { Injectable } from '@nestjs/common';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsUUID } from 'class-validator';
import { ComparisonOperatorBoolean } from '../enums/comparison-operator-boolean.enum';

@Injectable()
@InputType()
export class FilterKeyInput {
  @IsUUID(4)
  @Field(() => ID)
  value: string;

  @IsEnum(ComparisonOperatorBoolean)
  @Field(() => ComparisonOperatorBoolean)
  operator: string;
}
