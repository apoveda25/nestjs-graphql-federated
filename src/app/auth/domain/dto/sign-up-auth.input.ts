import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpAuthInput {
  @Field(() => ID)
  _key: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
