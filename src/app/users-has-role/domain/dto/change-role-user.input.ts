import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ChangeRoleUserInput {
  @Field(() => ID, {
    description: 'Example field (Users/20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  userId: string;

  @Field(() => ID, {
    description: 'Example field (Roles/20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  roleId: string;
}
