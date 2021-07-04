import { Field, ID, InputType } from '@nestjs/graphql';
import { COLLECTIONS_ENUM, SCOPES_ACTIONS_ENUM } from '../enums/scopes.enum';

@InputType()
export class CreateScopeInput {
  @Field(() => ID, {
    description: 'Example field (20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  _key: string;

  @Field(() => SCOPES_ACTIONS_ENUM, {
    description: 'Example field (CREATE)',
  })
  action: string;

  @Field(() => COLLECTIONS_ENUM, {
    description: 'Example field (Scopes)',
  })
  collection: string;
}
