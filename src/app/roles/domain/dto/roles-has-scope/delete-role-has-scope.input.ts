import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteRoleHasScopeInput {
  @Field(() => ID, {
    description: 'Example field (Roles/20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  roleId: string;

  @Field(() => [ID], {
    description: 'Example field (Scopes/20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  scopesId: string[];
}
