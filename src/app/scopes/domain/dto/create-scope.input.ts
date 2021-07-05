import { Field, ID, InputType } from '@nestjs/graphql';
import { collectionsEnum } from '../../../../shared/enums/collections.enum';
import { scopesActionsEnum } from '../enums/scopes.enum';

@InputType()
export class CreateScopeInput {
  @Field(() => ID, {
    description: 'Example field (20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  _key: string;

  @Field(() => scopesActionsEnum, {
    description: 'Example field (CREATE)',
  })
  action: string;

  @Field(() => collectionsEnum, {
    description: 'Example field (Scopes)',
  })
  collection: string;
}
