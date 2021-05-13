import { Field, InputType } from '@nestjs/graphql';
import { SortMode } from '../../../../shared/enums/sort-mode.enum';

@InputType()
export class SortRoleInput {
  @Field(() => Boolean, { nullable: true })
  _key?: boolean;

  @Field(() => Boolean, { nullable: true })
  name?: boolean;

  @Field(() => Boolean, { nullable: true })
  description?: boolean;

  @Field(() => Boolean, { nullable: true })
  active?: boolean;

  @Field(() => Boolean, { nullable: true })
  default?: boolean;

  @Field(() => Boolean, { nullable: true })
  createdBy?: boolean;

  @Field(() => Boolean, { nullable: true })
  updatedBy?: boolean;

  @Field(() => Boolean, { nullable: true })
  createdAt?: boolean;

  @Field(() => Boolean, { nullable: true })
  updatedAt?: boolean;

  @Field(() => SortMode)
  sortMode: SortMode;
}
