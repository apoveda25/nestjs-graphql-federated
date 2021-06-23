import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional } from 'class-validator';
import { FilterDatetimeInput } from '../../../../shared/dto/filter-datetime.input';
import { FilterKeyInput } from '../../../../shared/dto/filter-key.input';
import { FilterStringInput } from '../../../../shared/dto/filter-string.input';

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

  @Field(() => [FilterDatetimeInput], { nullable: true })
  @IsArray()
  @IsOptional()
  createdAt?: FilterDatetimeInput[];

  @Field(() => [FilterDatetimeInput], { nullable: true })
  @IsArray()
  @IsOptional()
  updatedAt?: FilterDatetimeInput[];
}
