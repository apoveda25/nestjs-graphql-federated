import { Field, InputType } from '@nestjs/graphql';
import { FilterBooleanInput } from '../../../../shared/dto/filter-boolean.input';
import { FilterDatetimeInput } from '../../../../shared/dto/filter-datetime.input';
import { FilterIntInput } from '../../../../shared/dto/filter-int.input';
import { FilterKeyInput } from '../../../../shared/dto/filter-key.input';
import { FilterStringInput } from '../../../../shared/dto/filter-string.input';

@InputType()
export class FilterRoleInput {
  @Field(() => [FilterKeyInput], { nullable: true })
  _key?: FilterKeyInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  name?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  description?: FilterStringInput[];

  @Field(() => [FilterBooleanInput], { nullable: true })
  active?: FilterBooleanInput[];

  @Field(() => [FilterIntInput], { nullable: true })
  level?: FilterIntInput[];

  @Field(() => [FilterBooleanInput], { nullable: true })
  default?: FilterBooleanInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  createdBy?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  updatedBy?: FilterStringInput[];

  @Field(() => [FilterDatetimeInput], { nullable: true })
  createdAt?: FilterDatetimeInput[];

  @Field(() => [FilterDatetimeInput], { nullable: true })
  updatedAt?: FilterDatetimeInput[];
}
