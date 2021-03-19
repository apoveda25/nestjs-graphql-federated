import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, {
    description: 'Example field (Users/20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  _id: string;

  @Field(() => ID, {
    description: 'Example field (20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  _key: string;

  @Field(() => String, {
    description: 'Example field (username)',
  })
  username: string;

  @Field(() => String, {
    description: 'Example field (email@email.com)',
  })
  email: string;

  @Field(() => String, {
    description: 'Example field (name)',
  })
  name: string;

  @Field(() => String, {
    description: 'Example field (surname)',
  })
  surname: string;

  @Field(() => Boolean, {
    description: 'Example field (true)',
  })
  active: boolean;

  @Field(() => Boolean, {
    description: 'Example field (true)',
  })
  emailActive: boolean;

  @Field(() => Number, {
    description: `Example field (${Date.now()})`,
  })
  birthday: number;

  @Field(() => String, {
    description: `Example field (MALE | FEMALE)`,
  })
  gender: string;

  @Field(() => String, {
    description: `Example field (Users/20f736ce-b6a0-4ed5-8062-47d32c844d3d)`,
  })
  createdBy: string;

  @Field(() => String, {
    description: `Example field (Users/20f736ce-b6a0-4ed5-8062-47d32c844d3d)`,
  })
  updatedBy: string;

  @Field(() => Number, {
    description: `Example field (${Date.now()})`,
  })
  createdAt: number;

  @Field(() => Number, {
    description: `Example field (${Date.now()})`,
  })
  updatedAt: number;
}