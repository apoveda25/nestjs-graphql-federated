import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInAuthInput {
  @Field(() => String)
  usernameOrEmail: string;

  @Field(() => String)
  password: string;
}
