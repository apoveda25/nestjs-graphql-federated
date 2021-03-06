import { Field, GraphQLTimestamp, ID, InputType } from '@nestjs/graphql';
import { usersGenderEnum } from '../enums/users.enum';

@InputType()
export class UpdateUserInput {
  @Field(() => ID, {
    description: 'Example field (20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  _key: string;

  @Field(() => String, {
    description: 'Example field (username)',
    nullable: true,
  })
  username?: string;

  @Field(() => String, {
    description: 'Example field (email@email.com)',
    nullable: true,
  })
  email?: string;

  @Field(() => Boolean, {
    description: 'Example field (true)',
    nullable: true,
  })
  active?: boolean;

  @Field(() => String, {
    description: 'Example field (name)',
    nullable: true,
  })
  name?: string;

  @Field(() => String, {
    description: 'Example field (surname)',
    nullable: true,
  })
  surname?: string;

  @Field(() => GraphQLTimestamp, {
    description: `Example field (1622236241726)`,
    nullable: true,
  })
  birthday?: number;

  @Field(() => usersGenderEnum, {
    description: `Example field (MALE | FEMALE | UNDEFINED)`,
    nullable: true,
  })
  gender?: string;

  @Field(() => String, {
    description: `Example field (prefix)`,
    nullable: true,
  })
  prefix?: string;

  @Field(() => String, {
    description: `Example field (prefix)`,
    nullable: true,
  })
  urlImage?: string;
}
