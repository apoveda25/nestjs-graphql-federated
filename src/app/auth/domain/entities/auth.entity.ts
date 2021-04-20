import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../users/domain/entities/user.entity';

@ObjectType()
export class Auth {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user?: User;
}
