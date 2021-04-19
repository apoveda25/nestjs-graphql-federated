import { Field, InputType } from '@nestjs/graphql';
import { FilterBooleanInput } from '../../../../shared/dto/filter-boolean.input';
import { FilterIntInput } from '../../../../shared/dto/filter-int.input';
import { FilterKeyInput } from '../../../../shared/dto/filter-key.input';
import { FilterStringInput } from '../../../../shared/dto/filter-string.input';
import { OperatorBoolean } from '../../../../shared/enums/operator-boolean.enum';

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

  @Field(() => [FilterIntInput], { nullable: true })
  birthday?: FilterIntInput[];

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

  @Field(() => [FilterIntInput], { nullable: true })
  createdAt?: FilterIntInput[];

  @Field(() => [FilterIntInput], { nullable: true })
  updatedAt?: FilterIntInput[];

  @Field(() => OperatorBoolean)
  separator: OperatorBoolean;
}
