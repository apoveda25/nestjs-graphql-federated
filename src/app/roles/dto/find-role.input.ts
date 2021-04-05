import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class FindRoleInput {
  @Field(() => ID, {
    description: 'Example field (Roles/20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
    nullable: true,
  })
  _id?: string;

  @Field(() => ID, {
    description: 'Example field (20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
    nullable: true,
  })
  _key?: string;

  @Field(() => String, {
    description: 'Example field (name)',
    nullable: true,
  })
  name?: string;

  @Field(() => String, {
    description: 'Example field (description)',
    nullable: true,
  })
  description?: string;

  @Field(() => Boolean, {
    description: 'Example field (true)',
    nullable: true,
  })
  active?: boolean;

  @Field(() => Boolean, {
    description: 'Example field (true)',
    nullable: true,
  })
  default?: boolean;
}
