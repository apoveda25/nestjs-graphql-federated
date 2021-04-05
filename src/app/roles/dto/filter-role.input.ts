import { Field, InputType } from '@nestjs/graphql';
import { FilterBooleanInput } from '../../../shared/dto/filter-boolean.input';
import { FilterIntInput } from '../../../shared/dto/filter-int.input';
import { FilterKeyInput } from '../../../shared/dto/filter-key.input';
import { FilterStringInput } from '../../../shared/dto/filter-string.input';
import { OperatorBoolean } from '../../../shared/enums/operator-boolean.enum';

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

  @Field(() => [FilterBooleanInput], { nullable: true })
  default?: FilterBooleanInput[];

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
