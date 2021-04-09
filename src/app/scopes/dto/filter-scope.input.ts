import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { FilterIntInput } from '../../../shared/dto/filter-int.input';
import { FilterKeyInput } from '../../../shared/dto/filter-key.input';
import { FilterStringInput } from '../../../shared/dto/filter-string.input';
import { OperatorBoolean } from '../../../shared/enums/operator-boolean.enum';

@InputType()
export class FilterScopeInput {
  @Field(() => [FilterKeyInput], { nullable: true })
  @IsArray()
  @IsOptional()
  _key?: FilterKeyInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  name?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  action?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  collection?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  createdBy?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  updatedBy?: FilterStringInput[];

  @Field(() => [FilterIntInput], { nullable: true })
  @IsArray()
  @IsOptional()
  createdAt?: FilterIntInput[];

  @Field(() => [FilterIntInput], { nullable: true })
  @IsArray()
  @IsOptional()
  updatedAt?: FilterIntInput[];

  @Field(() => OperatorBoolean)
  @IsString()
  separator: OperatorBoolean;
}
