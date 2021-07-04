import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteRoleInput {
  @Field(() => ID, {
    description: 'Example field (20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  _key: string;
}
