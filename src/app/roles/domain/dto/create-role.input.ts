import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field(() => ID, {
    description: 'Example field (20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  _key: string;

  @Field(() => String, {
    description: 'Example field (name)',
  })
  name: string;

  @Field(() => String, {
    description: 'Example field (description)',
    nullable: true,
    defaultValue: '',
  })
  description: string;

  @Field(() => Boolean, {
    description: 'Example field (true)',
    nullable: true,
    defaultValue: true,
  })
  active: boolean;

  @Field(() => Int, {
    description: 'Example field (1)',
  })
  level: number;
}
