import { Field, InputType } from '@nestjs/graphql';
import { FilterBooleanInput } from '../../../../shared/dto/filter-boolean.input';
import { FilterDatetimeInput } from '../../../../shared/dto/filter-datetime.input';
import { FilterKeyInput } from '../../../../shared/dto/filter-key.input';
import { FilterStringInput } from '../../../../shared/dto/filter-string.input';

@InputType()
export class FilterUserInput {
  @Field(() => [FilterKeyInput], { nullable: true })
  _key?: FilterKeyInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  username?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  email?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  name?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  surname?: FilterStringInput[];

  @Field(() => [FilterBooleanInput], { nullable: true })
  active?: FilterBooleanInput[];

  @Field(() => [FilterBooleanInput], { nullable: true })
  emailActive?: FilterBooleanInput[];

  @Field(() => [FilterDatetimeInput], { nullable: true })
  birthday?: FilterDatetimeInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  gender?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  prefix?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  urlImage?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  createdBy?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  updatedBy?: FilterStringInput[];

  @Field(() => [FilterDatetimeInput], { nullable: true })
  createdAt?: FilterDatetimeInput[];

  @Field(() => [FilterDatetimeInput], { nullable: true })
  updatedAt?: FilterDatetimeInput[];
}
