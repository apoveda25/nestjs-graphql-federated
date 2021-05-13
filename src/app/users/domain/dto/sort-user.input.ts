import { Field, InputType } from '@nestjs/graphql';
import { SortMode } from '../../../../shared/enums/sort-mode.enum';

@InputType()
export class SortUserInput {
  @Field(() => Boolean, { nullable: true })
  _key?: boolean;

  @Field(() => Boolean, { nullable: true })
  username?: boolean;

  @Field(() => Boolean, { nullable: true })
  email?: boolean;

  @Field(() => Boolean, { nullable: true })
  name?: boolean;

  @Field(() => Boolean, { nullable: true })
  surname?: boolean;

  @Field(() => Boolean, { nullable: true })
  active?: boolean;

  @Field(() => Boolean, { nullable: true })
  emailActive?: boolean;

  @Field(() => Boolean, { nullable: true })
  birthday?: boolean;

  @Field(() => Boolean, { nullable: true })
  gender?: boolean;

  @Field(() => Boolean, { nullable: true })
  prefix?: boolean;

  @Field(() => Boolean, { nullable: true })
  urlImage?: boolean;

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
